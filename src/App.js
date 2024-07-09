import React, { useEffect, useState } from 'react';
import {Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import InicioSesion from './Pages';
import CarasSeleccionar from './Pages/CaraSeleccionar'; 
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
      <Routes>
        <Route path="/" element={<InicioSesion setToken={setToken} />} />
        {token ? (
          <Route path="/CarasSeleccionar" element={<CarasSeleccionar />} />
        ) : (
          <Route path="*" element={<InicioSesion setToken={setToken} />} />
        )}
      </Routes>
  );
}

export default App;
