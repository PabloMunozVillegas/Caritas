//Importamos las librerias necesarias
import React, { useState } from 'react';
//Importamos el navigate de react router dom
import { useNavigate } from 'react-router-dom';
//Importamos las librerias necesarias para el icono de la fuente awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Importamos los iconos necesarios para el icono de la fuente awesome
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
//Importamos las funciones de la API
import { APIFunctions } from '../Funciones/FuncionesApi';

//Creamos un componente que recibe el token como propiedad
const InicioSesion = ({ setToken }) => {
  //Creamos un estado donde almacenaremos los datos del formulario
  const [formData, setFormData] = useState({
    //Aqui se declaran los datos del formulario
    user: '',
    password: ''
  });

  //Creamos un estado donde almacenaremos el estado de la carga
  const [loading, setLoading] = useState(false);
  //Creamos un estado donde almacenaremos el estado de la contraseña
  const [showPassword, setShowPassword] = useState(false);
  //Obtenemos el navigate de react router dom
  const navigate = useNavigate();

  //Creamos una funcion que se encarga de enviar el formulario
  const handleFormSubmit = async (event) => {
    //Evitamos que se envie el formulario con el boton de submit
    event.preventDefault();
    //Establecemos el estado de la carga
    setLoading(true);
    
    //Hacemos un try para ver si la peticion se ha podido hacer
    try {
      //Declaramos la respuesta de la peticion
      const response = await APIFunctions.autenticacion.login(formData);
      //Hacemos un if para ver si la peticion se ha podido hacer y el token nos da el servidor
      if (response && response.token) {
        //Hacemos un set para guardar el token en localStorage
        localStorage.setItem('token', response.token);
        //Hacemos un set para actualizar el token en el estado
        setToken(response.token);
        //Hacemos un navigate para redireccionar al path de CarasSeleccionar
        navigate('/CarasSeleccionar'); 
        //Si no se ha podido hacer, lanzamos un error
      } else {
        //En caso contrario, lanzamos un error
        console.error('No se recibió token de autenticación.');
      }
      //Hacemos un catch para ver si hay algun error
    } catch (error) {
      //Si hay algun error, lanzamos un error
      console.error('Error al iniciar sesión:', error);
    } finally {
      //Finalmente, establecemos el estado de la carga
      setLoading(false);
    }
  };
  
  //Creamos una funcion que se encarga de cambiar el estado de la contraseña
  const togglePasswordVisibility = () => {
    //Establecemos el estado de la contraseña
    setShowPassword(!showPassword);
  };

  //Creamos una funcion que se encarga de cambiar el valor del input del formulario
  const handleChangeLogin = (event) => {
    //Obtenemos el nombre y el valor del input del formulario
    const { name, value } = event.target;
    //Establecemos el valor del input del formulario en el estado
    setFormData({
      //Establecemos el valor del input del formulario en el estado
      ...formData,
      [name]: value
    });
  };

  //Devolvemos el componente
  return (
    //Devolvemos el componente
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
