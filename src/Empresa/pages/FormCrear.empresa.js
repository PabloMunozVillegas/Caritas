import React, { useState } from 'react';
import { crearEmpresa } from '../api/apiPost';
import { Toaster, toast } from 'react-hot-toast';
import { useAuth } from '../../useContext';

const CrearEmpresa = () => {
    const { token } = useAuth();
    const [formData, setFormData] = useState({
        nombre: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario
        try {
            const response = await crearEmpresa(formData, token);
            if (response.status === 201) {
                toast.success('Empresa creada exitosamente');
                setFormData({ nombre: '' }); // Reiniciar el formulario
            } else {
                console.error('Error al crear empresa:', response.data.message);
                toast.error(response.data.message || 'Ocurrió un error');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || 'Error al conectar con el servidor');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">CREAR UNA NUEVA EMPRESA</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow">
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                        Nombre
                    </label>
                    <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Guardar Empresa
                </button>
            </form>
            <Toaster />
        </div>
    );
};

export default CrearEmpresa;
