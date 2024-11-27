import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import { X } from "lucide-react";
import { useAuth } from "../../useContext";
import { crearUsuario } from "../api/apiPost";
import { actualizarUsuario } from "../api/apiPatch";
import { getEmpresas, getSucursales} from "../api/apiGet";
import toast, {Toaster} from "react-hot-toast";

const AnimatedInputField = ({
  label,
  name,
  type = "text",
  options = [],
  value,
  onChange,
  errorShake = false,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-6"
  >
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    {type === "select" ? (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccione una opción</option>
        {options.map((option) => (
          <option key={option._id || option} value={option._id || option}>
            {option.nombre || option}
          </option>
        ))}
      </select>
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )}
  </motion.div>
);

const EditarUsuarios = ({ isOpen, onClose, userData }) => {
  const [sucursales, setSucursales] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const { token } = useAuth();
  
  // Find the matching empresa for the user
  const findMatchingEmpresa = (empresasList, userEmpresa) => {
    return empresasList.find(empresa => 
      empresa.nombre.toLowerCase() === userEmpresa.toLowerCase()
    );
  };

  const [form, setForm] = useState({
    nombres: userData.nombres || '',
    apellidos: userData.apellidos || '',
    user: userData.user || '',
    empresa: '', // Will be set dynamically
    sucursal: '', // Will be set dynamically
    password: '',
    rol: userData.rol || '',
  });

  // Fetch empresas and set the correct empresa
  useEffect(() => {
    const fetchEmpresas = async () => {
      const data = await getEmpresas(token);
      setEmpresas(data);

      // Find and set the matching empresa
      const matchingEmpresa = findMatchingEmpresa(data, userData.empresa);
      if (matchingEmpresa) {
        setForm(prevForm => ({
          ...prevForm,
          empresa: matchingEmpresa._id
        }));
      }
    };
    fetchEmpresas();
  }, [token, userData.empresa]);

  // Fetch sucursales for the selected empresa and set the correct sucursal
  useEffect(() => {
    const fetchSucursales = async () => {
      if (form.empresa) {
        const data = await getSucursales(form.empresa, token);
        setSucursales(data);

        // Find and set the matching sucursal
        const matchingSucursal = data.find(sucursal => 
          sucursal.nombre.toLowerCase() === userData.sucursal.toLowerCase()
        );
        
        if (matchingSucursal) {
          setForm(prevForm => ({
            ...prevForm,
            sucursal: matchingSucursal._id
          }));
        }
      } else {
        setSucursales([]);
      }
    };
    fetchSucursales();
  }, [form.empresa, token, userData.sucursal]);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Prepare the data to send, excluding empresa
    const dataToSend = {
      nombres: form.nombres,
      apellidos: form.apellidos,
      user: form.user,
      sucursal: form.sucursal, // Send sucursal ID
      rol: form.rol,
      ...(form.password && { password: form.password }) // Only send password if it's not empty
    };
    try {
      const response = await actualizarUsuario(userData._id, dataToSend, token);
      console.log('Datos actualizados:', response);
      toast.success('Datos actualizados exitosamente');
      onClose();
    } catch (error) {
      toast.error('Error al actualizar usuario');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Crear Usuario"
      className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg"
      overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-600">ACTUALIZAR USUARIO</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatedInputField
            label="Usuario"
            name="user"
            value={form.user}
            onChange={handleChange}
          />
        </div>
        <AnimatedInputField
          label="Empresa"
          name="empresa"
          type="select"
          options={empresas}
          value={form.empresa}
          onChange={handleChange}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
        <button
          type="submit"
          className="w-full p-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
        >
          Guardar Usuario
        </button>
      </form>
      <Toaster />
    </Modal>
  );
};

export default EditarUsuarios;