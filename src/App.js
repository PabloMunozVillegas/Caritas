import React, { useEffect, useState } from 'react';
import {Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import InicioSesion from './Paginas';
import CarasSeleccionar from './Paginas/Pagina-Cliente'; 
import './App.css';

function App() {
  //Aqui se guarda el token de la autenticación
  const [token, setToken] = useState(localStorage.getItem('token'));

  //Aqui checkeamos si el token esta o no en localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    //Aqui se agrega un evento de cambio de storage
    window.addEventListener('storage', handleStorageChange);

    //Aqui se borra el evento de cambio de storage
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
      //Aqui se crean las rutas de navegación
      <Routes>
        {/*Aqui se redirecciona a la carpeta Pagina*/}
        <Route path="/" element={<InicioSesion setToken={setToken} />} />
        {/*Preuntamos si el token esta o no en localStorage*/}
        {token ? (
          //En caso de que el token este en localStorage, damos acceso a la carpeta CarasSeleccionar
          <Route path="/CarasSeleccionar" element={<CarasSeleccionar />} />
        ) : (
          //En caso contrario, damos acceso a la carpeta Pagina
          <Route path="*" element={<InicioSesion setToken={setToken} />} />
        )}
      </Routes>
  );
}

export default App;
