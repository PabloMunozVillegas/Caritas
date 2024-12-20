import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../useContext";
import { crearUsuario } from "../api/apiPost";
import toast, { Toaster } from "react-hot-toast";
import { getEmpresas, getSucursales } from "../api/apiGet";

const AnimatedInputField = ({ label, name, type = "text", options = [], value, onChange }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <motion.label
        whileHover={{ scale: 1.02 }}
        htmlFor={name}
        className="block text-lg font-medium text-gray-700 mb-2"
      >
        {label}
      </motion.label>
      {type === "select" ? (
        <motion.select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          whileFocus={{ scale: 1.02 }}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Seleccione una opción</option>
          {options.map((option) => (
            <option key={option._id || option} value={option._id || option}>
              {option.nombre || option}
            </option>
          ))}
        </motion.select>
      ) : (
        <motion.input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          whileFocus={{ scale: 1.02 }}
          whileHover={{ scale: 1.01 }}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      )}
    </motion.div>
  );
};

const CrearUsuarios = () => {
  const [sucursales, setSucursales] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useAuth();
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    user: "",
    password: "",
    empresa: "",
    sucursal: "",
    rol: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const data = await getEmpresas(token);
        setEmpresas(data);
      } catch (error) {
        toast.error(`Error al obtener empresas: ${error.message}`);
      }
    };
    fetchEmpresas();
  }, [token]);

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        if (form.empresa) {
          const data = await getSucursales(form.empresa, token);
          setSucursales(data);
        } else {
          setSucursales([]);
        }
      } catch (error) {
        toast.error(`Error al obtener sucursales: ${error.message}`);
      }
    };
    fetchSucursales();
  }, [form.empresa, token]);

  const validatePassword = (password) => {
    const validations = [
      { test: (p) => p.length >= 8, message: "La contraseña debe tener al menos 8 caracteres" },
      { test: (p) => /[a-z]/.test(p), message: "La contraseña debe contener al menos una letra minúscula" },
      { test: (p) => /[A-Z]/.test(p), message: "La contraseña debe contener al menos una letra mayúscula" },
      { test: (p) => /[0-9]/.test(p), message: "La contraseña debe contener al menos un número" },
      { test: (p) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p), message: "La contraseña debe contener al menos un carácter especial" }
    ];

    for (let validation of validations) {
      if (!validation.test(password)) {
        toast.error(validation.message);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Validate all fields are filled
    const requiredFields = ['nombres', 'apellidos', 'user', 'password', 'empresa', 'sucursal', 'rol'];
    for (let field of requiredFields) {
      if (!form[field]) {
        toast.error(`Por favor complete el campo ${field.charAt(0).toUpperCase() + field.slice(1)}`);
        setIsSubmitting(false);
        return;
      }
    }

    // Password validation
    if (!validatePassword(form.password)) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await crearUsuario(form, token);
      toast.success("Usuario creado exitosamente");
      
      // Reset form after successful creation
      setForm({
        nombres: "",
        apellidos: "",
        user: "",
        password: "",
        empresa: "",
        sucursal: "",
        rol: "",
      });
    } catch (error) {
      // Check if error response has a specific message
      const errorMessage = error.response?.data?.message || error.message || "Error al crear usuario";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg"
    >
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-8 text-center text-blue-600"
      >
        Crear Nuevo Usuario
      </motion.h1>
      
      <form onSubmit={handleSubmit}>
        <AnimatedInputField 
          label="Nombres" 
          name="nombres" 
          value={form.nombres}
          onChange={handleChange}
        />
        <AnimatedInputField 
          label="Apellidos" 
          name="apellidos" 
          value={form.apellidos}
          onChange={handleChange}
        />
        <AnimatedInputField 
          label="Usuario" 
          name="user" 
          value={form.user}
          onChange={handleChange}
        />
        <AnimatedInputField 
          label="Contraseña" 
          name="password" 
          type="password" 
          value={form.password}
          onChange={handleChange}
        />
        <AnimatedInputField 
          label="Empresa" 
          name="empresa" 
          type="select" 
          options={empresas}
          value={form.empresa}
          onChange={handleChange}
        />
        <AnimatedInputField 
          label="Sucursal" 
          name="sucursal" 
          type="select" 
          options={sucursales}
          value={form.sucursal}
          onChange={handleChange}
        />
        <AnimatedInputField 
          label="Rol" 
          name="rol" 
          type="select" 
          options={["Usuario", "Administrador"]}
          value={form.rol}
          onChange={handleChange}
        />
        
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
            ${isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar Usuario'}
        </motion.button>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </motion.div>
  );
};

export default CrearUsuarios;