import React from 'react';
import { Outlet } from 'react-router-dom';

const PaginaAdministrador = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PaginaAdministrador;