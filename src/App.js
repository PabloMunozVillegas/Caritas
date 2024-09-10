import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import useToken from './useToken';
import InicioSesion from './Paginas';
import CarasSeleccionar from './Paginas/Pagina-Cliente';
import PaginaAdministrador from './Paginas/Pagina-Administrador';
// Definir las rutas permitidas para cada rol
const routesByRole = {
  Usuario: [
    { path: '/clientes', component: CarasSeleccionar },
  ],
  Administrador: [
    { path: '/admin', component: PaginaAdministrador },
  ],
};

// Componente para manejar la redirección basada en el rol
const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useToken();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Redirigir a la primera ruta permitida para el rol del usuario
    const defaultRoute = routesByRole[role]?.[0]?.path || '/';
    return <Navigate to={defaultRoute} replace />;
  }

  return children;
};

function App() {
  const { isAuthenticated, checkAuthStatus, role } = useToken();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const check = async () => {
      await checkAuthStatus();
      setIsChecking(false);
    };
    check();

    const intervalId = setInterval(check, 1000);
    return () => clearInterval(intervalId);
  }, [checkAuthStatus]);

  if (isChecking) {
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={!isAuthenticated ? <InicioSesion /> : <Navigate to={routesByRole[role]?.[0]?.path || '/'} />} />
      
      {Object.entries(routesByRole).flatMap(([roleKey, routes]) =>
        routes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <RoleBasedRoute allowedRoles={[roleKey]}>
                <Component />
              </RoleBasedRoute>
            }
          />
        ))
      )}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;