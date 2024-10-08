import React, { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import useApiFunctions from '../Hoook/ApiFunc';
import useToken from '../useToken';

const InicioSesion = () => {
  const [formData, setFormData] = useState({ user: '', password: '' });
  const { setTokenAndRole ,  isAuthenticated } = useToken();
  const { crearTodo } = useApiFunctions();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);



  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const response = await crearTodo('inicioSesion', null, formData);
      if (response.token) {
        console.log('Token recibido:', response);
        setTokenAndRole(response.token, response.rol);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      setLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChangeLogin = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isAuthenticated) {
    return null;
  }


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