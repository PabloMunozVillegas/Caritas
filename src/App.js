import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './useContext';
import InicioSesion from './Auth/index.auth';
import CarasSeleccionar from './Reacciones/pages/Calificar.reacciones';
import { Inicio } from './Inicio';
import PaginaAdministrador from './Admin/index.admin';
import { Despedida } from './Despedida/index.despedida';
import { Salida } from './Salida/index.salida';
import { Formulario } from './Formulario/index';
import Sidebar from './shared/layout/Sidebar';

// Admin Pages Imports
import CrearEmpresa from './Empresa/pages/FormCrear.empresa';
import ListarEmpresas from './Empresa/pages/TablaListar.empresa';
import EstadisticasEmpresa from './Empresa/pages/Estadisticas.empresa';
import CrearSucursal from './Sucursales/pages/FormCrear.sucursales';
import ListarSucursal from './Sucursales/pages/TablaLisrtar.sucursales';
import EstadisticasSucursal from './Sucursales/pages/Estadisticas.sucursales';
import CrearUsuarios from './Usuarios/pages/FormCrear.usuarios';
import ListarUsuarios from './Usuarios/pages/TablaListar.usuarios';
import ListarReacciones from './Reacciones/pages/Listar.reacciones';
import CrearCorreo from './Email/pages/FormCrear.email';

const routesByRole = {
  Usuario: [
    { path: '/clientes', component: Inicio },
    { path: '/clientes/calificar', component: CarasSeleccionar },
    { path: '/clientes/despedida/muybuena', component: Despedida },
    { path: '/clientes/despedida/buena', component: Despedida },
    { path: '/clientes/despedida/regular', component: Despedida },
    { path: '/clientes/despedida/mala', component: Despedida },
    { path: '/clientes/despedida/muymala', component: Despedida },
    { path: '/clientes/salida', component: Salida },
    { path: '/clientes/regalo', component: Formulario },
  ],
  Administrador: [
    { path: '/admin', component: PaginaAdministrador },
    { path: '/admin/empresa/crear', component: CrearEmpresa },
    { path: '/admin/empresa/listar', component: ListarEmpresas },
    { path: '/admin/empresa/estadisticas', component: EstadisticasEmpresa },
    { path: '/admin/sucursal/crear', component: CrearSucursal },
    { path: '/admin/sucursal/listar', component: ListarSucursal },
    { path: '/admin/sucursal/estadisticas', component: EstadisticasSucursal },
    { path: '/admin/usuario/crear', component: CrearUsuarios },
    { path: '/admin/usuario/listar', component: ListarUsuarios },
    { path: '/admin/calificaciones/listar', component: ListarReacciones },
    { path: '/admin/correo/crear', component: CrearCorreo },
  ],
};

const AdminLayout = ({ children, isDarkMode, toggleDarkMode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-black'}`}>
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />
      <div className={`flex-1 transition-transform duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {React.cloneElement(children, { isDarkMode, toggleDarkMode })}
      </div>
    </div>
  );
};

const RoleBasedRoute = ({ children, allowedRoles, isDarkMode, toggleDarkMode }) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    const defaultRoute = routesByRole[role]?.[0]?.path || '/';
    return <Navigate to={defaultRoute} replace />;
  }

  return children;
};

function App() {
  const { isAuthenticated, role } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsChecking(false);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  if (isChecking) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Routes>
        <Route 
          path="/" 
          element={!isAuthenticated ? <InicioSesion /> : <Navigate to={routesByRole[role]?.[0]?.path || '/'} />} 
        />
        
        {Object.entries(routesByRole).flatMap(([roleKey, routes]) =>
          routes.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <RoleBasedRoute allowedRoles={[roleKey]} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
                  {roleKey === 'Administrador' ? (
                    <AdminLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
                      <Component />
                    </AdminLayout>
                  ) : (
                    <Component />
                  )}
                </RoleBasedRoute>
              }
            />
          ))
        )}
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;