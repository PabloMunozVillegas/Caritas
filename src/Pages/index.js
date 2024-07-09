import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { APIFunctions } from '../Functions/ApiFuntions';

const InicioSesion = ({ setToken }) => {
  const [formData, setFormData] = useState({
    user: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const response = await APIFunctions.autenticacion.login(formData); // Llama correctamente la función de API
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        navigate('/CarasSeleccionar'); 
      } else {
        console.error('No se recibió token de autenticación.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    } finally {
      setLoading(false);
    }
  };
  
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeLogin = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-300 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Iniciar Sesión</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="user"
            value={formData.user}
            placeholder="Correo"
            onChange={handleChangeLogin}
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              placeholder="Contraseña"
              onChange={handleChangeLogin}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded-lg text-white ${loading ? 'bg-lime-400' : 'bg-lime-500 hover:bg-lime-600'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500`}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InicioSesion;
