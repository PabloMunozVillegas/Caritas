import React, { useState } from 'react';
import { useAuth } from '../useContext';
import { iniciarSesion } from './api/apiPost';
import toast from 'react-hot-toast'; 
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ user: '', password: '' });
  const [loginStatus, setLoginStatus] = useState(null);
  const [errorShake, setErrorShake] = useState(false);
  const { login } = useAuth();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoginStatus(null);
    setErrorShake(false);
  
    try {
      const response = await iniciarSesion(formData);
  
      setLoginStatus('success');
      
      setTimeout(() => {
        setFormData({ user: '', password: '' });
        login(response.token, response.rol);
        toast.success('Inicio de sesión exitoso');
      }, 1500);
    } catch (error) {
      setLoginStatus('error');
      setErrorShake(true);
  
      setTimeout(() => {
        setLoginStatus(null);
        setErrorShake(false);
        setFormData({ user: '', password: '' }); 
        toast.error('Error al iniciar sesión');
      }, 1500);
  
      console.error('Error during login:', error);
    }
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ 
      ...prevFormData, 
      [name]: value 
    }));
  };

  const fallingLettersVariants = {
    initial: { opacity: 1, y: 0, rotate: 0 },
    falling: { 
      opacity: [1, 1, 0],
      y: [0, 10, 100],
      rotate: [0, 10, -20],
      transition: { 
        duration: 0.6,
        times: [0, 0.5, 1],
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md border border-gray-300"
      >
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6 tracking-tight">
          Bienvenido
        </h2>
        
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <motion.div 
            initial={{ x: 0 }}
            animate={{ 
              x: loginStatus === 'error' ? [0, -10, 10, -10, 0] : 0 
            }}
            transition={{ duration: 0.5 }}
          >
            <label htmlFor="user" className="block text-lg font-medium text-gray-700 mb-2">
              Usuario
            </label>
            <div className="relative">
              {errorShake ? (
                <AnimatePresence>
                  {formData.user.split('').map((char, index) => (
                    <motion.span
                      key={index}
                      initial="initial"
                      animate="falling"
                      variants={fallingLettersVariants}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </AnimatePresence>
              ) : (
                <input 
                  type="text" 
                  id="user" 
                  name="user" 
                  value={formData.user} 
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
                  placeholder="Ingresa tu usuario" 
                  required 
                />
              )}
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 0 }}
            animate={{ 
              x: loginStatus === 'error' ? [0, -10, 10, -10, 0] : 0 
            }}
            transition={{ duration: 0.5 }}
          >
            <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              {errorShake ? (
                <AnimatePresence>
                  {formData.password.split('').map((char, index) => (
                    <motion.span
                      key={index}
                      initial="initial"
                      animate="falling"
                      variants={fallingLettersVariants}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </AnimatePresence>
              ) : (
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
                  placeholder="Ingresa tu contraseña" 
                  required 
                />
              )}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ 
              scale: loginStatus ? 1.05 : 1,
              backgroundColor: 
                loginStatus === 'success' ? '#10B981' :  // Green
                loginStatus === 'error' ? '#EF4444' :    // Red
                '#BFBFB'                                // Custom Blue
            }}
            transition={{ duration: 0.4 }}
            className="relative w-full"
          >
            <button 
              type="submit" 
              disabled={loginStatus !== null}
              className={`w-full p-4 text-white font-semibold rounded-lg transition duration-300 ease-in-out focus:outline-none shadow-lg ${
                loginStatus !== null ? 'cursor-not-allowed' : 'hover:bg-gray-600'
              }`}
            >
              <AnimatePresence>
                {loginStatus === null && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center"
                  >
                    Iniciar Sesión
                  </motion.div>
                )}
                {loginStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-6 h-6" />
                  </motion.div>
                )}
                {loginStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <XCircle className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>

          <div className="text-center text-sm text-gray-500 mt-4">
            <a href="#" className="hover:text-gray-600 transition duration-300">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;