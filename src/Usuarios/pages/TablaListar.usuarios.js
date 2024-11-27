import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getUsuarios, getUsuarioId} from '../api/apiGet';
import { useAuth } from '../../useContext';
import { FaEdit, FaTrash, FaEye, FaPlus, FaUsers } from 'react-icons/fa';
import toast, { Toaster } from "react-hot-toast";
import CrearUsuarios from '../components/ModalFormCrear.usuarios';
import EditarUsuarios from '../components/ModalFormEditar.usuarios';
import UserProfileModal from '../components/ModalInfo.usuarios';
import { eliminarUsuario } from '../api/apiDelete';

const ListarUsuarios = () => {
    const [datosTabla, setDatosTabla] = useState([]);
    const [userDataModal, setUserDataModal] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpenUserCreate, setIsModalOpenUserCreate] = useState(false);
    const [isModalOpenUserUpdate, setIsModalOpenUserUpdate] = useState(false);
    const [isModalOpenUserProfile, setIsModalOpenUserProfile] = useState(false);
    const { token } = useAuth();

    const fetchUsuarios = async () => {
        try {
            const usuarios = await getUsuarios(token);
            console.log('Datos obtenidos:', usuarios);
            setDatosTabla(usuarios);
            toast.success('Usuarios obtenidos exitosamente', {
                style: {
                    background: '#333',
                    color: '#fff',
                },
            });
        } catch (error) {
            toast.error('Error al obtener usuarios', {
                style: {
                    background: '#ff4b4b',
                    color: '#fff',
                },
            });
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, [token]);

    const handleEdit = async (id, sucursal, empresa) => {
        try {
            const user = await getUsuarioId(id, token);
      
            if (user) {
                const updatedUser = {
                    ...user,
                    sucursal,
                    empresa,
                };
      
                setUserDataModal(updatedUser);
                setIsModalOpenUserUpdate(true);
            } else {
                toast.error("No se encontraron datos para el usuario");
            }
        } catch (error) {
            console.error("Error al obtener usuario:", error);
            toast.error("Error al obtener usuario");
        }
    };

    const handleDelete = async (id) => {
        try {
            await eliminarUsuario(id, token);
            toast.success('Usuario eliminado exitosamente');
            await fetchUsuarios();
        } catch (error) {
            toast.error('Error al eliminar usuario');
        }
    };

    const handleViewProfile = async (id) => {
        try {
            const user = await getUsuarioId(id, token);
            setSelectedUser(user);
            setIsModalOpenUserProfile(true);
        } catch (error) {
            toast.error('Error al obtener detalles del usuario');
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { 
                delayChildren: 0.2, 
                staggerChildren: 0.1 
            } 
        }
    };

    const itemVariants = {
        hidden: { 
            y: 20, 
            opacity: 0 
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300
            }
        }
    };

    return (
        <motion.div 
            className="min-h-screen bg-gray-50 p-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div 
                className="container mx-auto bg-white shadow-xl rounded-2xl overflow-hidden"
                variants={itemVariants}
            >
                <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <FaUsers size={32} />
                        <h1 className="text-3xl font-bold tracking-wide">Gestión de Usuarios</h1>
                    </div>
                    <motion.button
                        onClick={() => setIsModalOpenUserCreate(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaPlus />
                        <span>Añadir Usuario</span>
                    </motion.button>
                </div>
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                                    <th className="py-3 px-4 text-left">Nombre</th>
                                    <th className="py-3 px-4 text-left">Apellido</th>
                                    <th className="py-3 px-4 text-left">Usuario</th>
                                    <th className="py-3 px-4 text-left">Empresa</th>
                                    <th className="py-3 px-4 text-left">Rol</th>
                                    <th className="py-3 px-4 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {datosTabla.map((usuario) => (
                                        <motion.tr 
                                            key={usuario._id} 
                                            className="border-b hover:bg-blue-50 transition"
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit={{ opacity: 0, height: 0 }}
                                        >
                                            <td className="py-4 px-4">{usuario.nombres}</td>
                                            <td className="py-4 px-4">{usuario.apellidos}</td>
                                            <td className="py-4 px-4">{usuario.user}</td>
                                            <td className="py-4 px-4">{usuario.empresa}</td>
                                            <td className="py-4 px-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold 
                                                    ${usuario.rol === 'Administrador' 
                                                    ? 'bg-green-200 text-green-800' 
                                                    : 'bg-blue-200 text-blue-800'}
                                                `}>
                                                    {usuario.rol}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <div className="flex justify-center space-x-3">
                                                    <motion.button 
                                                        onClick={() => handleEdit(usuario._id, usuario.sucursal, usuario.empresa)}
                                                        className="text-blue-500 hover:text-blue-700"
                                                        whileHover={{ scale: 1.2 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <FaEdit />
                                                    </motion.button>
                                                    <motion.button 
                                                        onClick={() => handleDelete(usuario._id)}
                                                        className="text-red-500 hover:text-red-700"
                                                        whileHover={{ scale: 1.2 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <FaTrash />
                                                    </motion.button>
                                                    <motion.button 
                                                        onClick={() => handleViewProfile(usuario._id)}
                                                        className="text-green-500 hover:text-green-700"
                                                        whileHover={{ scale: 1.2 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <FaEye />
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>

            {userDataModal && (
                <EditarUsuarios 
                    isOpen={isModalOpenUserUpdate} 
                    onClose={() => {
                        setIsModalOpenUserUpdate(false);
                        setUserDataModal(null);
                        fetchUsuarios();
                    }} 
                    userData={userDataModal} 
                />
            )}

            <CrearUsuarios 
                isOpen={isModalOpenUserCreate} 
                onClose={() => {
                    setIsModalOpenUserCreate(false);
                    fetchUsuarios();
                }} 
            />
            
            <UserProfileModal 
                user={selectedUser}
                isOpen={isModalOpenUserProfile}
                onClose={() => setIsModalOpenUserProfile(false)}
            />
            
            <Toaster position="top-right" reverseOrder={false} />
        </motion.div>
    );
};

export default ListarUsuarios;