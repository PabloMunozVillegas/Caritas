import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../../useContext";
import { crearSucursal } from "../api/apiPost";
import { obtenerEmpresas } from "../api/apiGet";

const ModalCrearSucursal = ({ isOpen, onClose }) => {
  const [nombre, setNombre] = useState("");
  const [empresaId, setEmpresaId] = useState("");
  const [empresas, setEmpresas] = useState([]);
  const { token } = useAuth();

  // Obtener las empresas cuando el modal se abre
  useEffect(() => {
    if (isOpen) {
      const fetchEmpresas = async () => {
        try {
          const response = await obtenerEmpresas(token); 
          
          // Validar la respuesta antes de setear
          if (Array.isArray(response)) {
            setEmpresas(response);
          } else {
            console.error('Respuesta de empresas no es un array:', response);
            toast.error('Error en la estructura de datos de empresas');
          }
        } catch (error) {
          console.error('Error al obtener empresas:', error);
          toast.error('Error al obtener empresas');
        }
      };
      fetchEmpresas();
    }
  }, [isOpen, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !empresaId) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    const formData = { 
      nombre: nombre.trim(), 
      empresa: empresaId.trim() 
    };

    try {
        const response = await crearSucursal(formData, token); 
        if (response.flag === "nuevo"){
            toast.success('Sucursal creada exitosamente');
            onClose();
        }
    }
    catch (error) {
      toast.error(error.response.data.message || 'Error al procesar la solicitud');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Crear Sucursal</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Nombre de la sucursal"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Empresa</label>
            <select
              value={empresaId}
              onChange={(e) => setEmpresaId(e.target.value)}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Selecciona una empresa</option>
              {empresas.map((empresa) => (
                <option key={empresa._id} value={empresa._id}>
                  {empresa.nombre}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Guardar
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default ModalCrearSucursal;