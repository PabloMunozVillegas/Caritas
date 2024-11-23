import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import useToken from './useToken';
import InicioSesion from './Auth/index.auth';
import CarasSeleccionar from './Reacciones/pages/Calificar.reacciones';
import { Inicio } from './Inicio';
import PaginaAdministrador from './Admin/index.admin';
import { Despedida } from './Despedida/index.despedida';
import { Salida } from './Salida/index.salida';
import { Formulario } from './Formulario/index';
import { Toaster } from 'react-hot-toast';

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
  ],
};

const RoleBasedRoute = ({ children, allowedRoles, isDarkMode, toggleDarkMode }) => {
  const { isAuthenticated, role } = useToken();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    const defaultRoute = routesByRole[role]?.[0]?.path || '/';
    return <Navigate to={defaultRoute} replace />;
  }

  return React.Children.map(children, child =>
    React.cloneElement(child, { isDarkMode, toggleDarkMode })
  );
};

function App() {
  const { isAuthenticated, checkAuthStatus, role } = useToken();
  const [isChecking, setIsChecking] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const check = async () => {
      await checkAuthStatus();
      setIsChecking(false);
    };
    check();

    const intervalId = setInterval(check, 1000);
    return () => clearInterval(intervalId);
  }, [checkAuthStatus]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  if (isChecking) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      
      <Routes>
        <Route path="/" element={!isAuthenticated ? <InicioSesion /> : <Navigate to={routesByRole[role]?.[0]?.path || '/'} />} />
        
        {Object.entries(routesByRole).flatMap(([roleKey, routes]) =>
          routes.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <RoleBasedRoute allowedRoles={[roleKey]} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
                  <Component />
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