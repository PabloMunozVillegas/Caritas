import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../useContext";
import { Toaster, toast } from "react-hot-toast";
import { obtenerCorreos } from "../api/apiGet";
import { eliminarCorreo } from "../api/apiDelete";
import { FaEdit, FaTrash, FaEye, FaTimes } from "react-icons/fa";

// Utility to split emails
const splitEmails = (emailString) => {
  return emailString.split(',').map(email => email.trim());
};

export const ListarCorreo = () => {
    const { token } = useAuth();
    const [correos, setCorreos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [correoIdEliminar, setCorreoIdEliminar] = useState(null);

    useEffect(() => {
        const fetchCorreos = async () => {
            try {
                const response = await obtenerCorreos(token);
                setCorreos(response);
            } catch (error) {
                console.error("Error al obtener correos:", error);
                toast.error("No se pudieron cargar los correos");
            }
        };
        fetchCorreos();
    }, [token]);

    const handleEdit = (id) => {
        console.log("ID de correo a editar:", id);
        // Implement edit logic or navigation
        toast.info("Funcionalidad de edición próximamente");
    };

    const abrirModalEliminar = (id) => {
        setCorreoIdEliminar(id);
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        if (!correoIdEliminar) return;

        try {
            const response = await eliminarCorreo(token, correoIdEliminar);
            console.log('Respuesta de eliminación:', response);
        } catch (error) {
            console.error("Error al eliminar correo:", error);
            toast.error("No se pudo eliminar el correo");
        }
    };

    const handleViewProfile = (id) => {
        console.log("ID de correo a ver:", id);
        // Implement view logic or navigation
        toast.info("Funcionalidad de vista próximamente");
    };

    // Modal de confirmación de eliminación
    const modalSeguroEliminar = (
        <AnimatePresence>
            {isModalOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                >
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-white rounded-lg shadow-lg w-96 p-6 relative"
                    >
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                            <FaTimes size={24} />
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-center">Eliminar Correo</h2>
                        <p className="text-center text-gray-500 mb-6">
                            ¿Estás seguro de que quieres eliminar este correo?
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button 
                                onClick={handleDelete}
                                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Eliminar
                            </button>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                            >
                                Cancelar
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto px-4 py-8"
        >
            <motion.h1 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-8 text-center text-gray-800"
            >
                Lista de Correos
            </motion.h1>

            {correos.length === 0 ? (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-500 mt-10"
                >
                    No hay correos para mostrar
                </motion.div>
            ) : (
                <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white shadow-xl rounded-lg overflow-hidden"
                >
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider">Destinatarios</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider">Titulo</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider">Cuerpo De Correo</th>
                                <th className="py-3 px-4 text-center text-xs font-semibold uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {correos.map((correo, index) => {
                                    const emails = splitEmails(correo.to);
                                    return (
                                        <motion.tr 
                                            key={correo._id}
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 50 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="py-4 px-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {emails.map((email, emailIndex) => (
                                                        <motion.span 
                                                            key={emailIndex}
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            className="bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 text-xs mr-1 mb-1"
                                                        >
                                                            {email}
                                                        </motion.span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">{correo.subject}</td>
                                            <td className="py-4 px-4 truncate max-w-xs">{correo.html}</td>
                                            <td className="py-4 px-4 text-center">
                                                <div className="flex justify-center space-x-3">
                                                    <motion.button
                                                        whileHover={{ scale: 1.2 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleEdit(correo._id)}
                                                        className="text-blue-500 hover:text-blue-700"
                                                    >
                                                        <FaEdit />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.2 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => abrirModalEliminar(correo._id)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <FaTrash />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.2 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleViewProfile(correo._id)}
                                                        className="text-green-500 hover:text-green-700"
                                                    >
                                                        <FaEye />
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </motion.div>
            )}

            {/* Modal de Eliminación */}
            {modalSeguroEliminar}

            <Toaster position="top-right" reverseOrder={false} />
        </motion.div>
    );
};

export default ListarCorreo;