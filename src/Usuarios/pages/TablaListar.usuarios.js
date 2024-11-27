import React, { useEffect, useState } from 'react';
import { getUsuarios, getUsuarioId } from '../api/apiGet';
import { useAuth } from '../../useContext';
import { FaEdit, FaTrash, FaEye, FaPlus, FaUsers, FaEnvelope, FaBuilding, FaIdCard } from 'react-icons/fa';
import { motion } from 'framer-motion';
import CrearUsuarios from '../components/ModalFormCrear.usuarios';
import toast, { Toaster } from "react-hot-toast";
import EditarUsuarios from '../components/ModalFormEditar.usuarios';
import { eliminarUsuario } from '../api/apiDelete';

const UserProfileModal = ({ user, isOpen, onClose }) => {
    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-xl p-8 w-96 max-w-md"
            >
                <div className="flex justify-center mb-6">
                    <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaUsers size={64} className="text-blue-500" />
                    </div>
                </div>
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{user.nombres} {user.apellidos}</h2>
                    <p className="text-blue-600 font-semibold">{user.rol}</p>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <FaIdCard className="text-blue-500" />
                        <div>
                            <p className="text-sm text-gray-600">Nombre de Usuario</p>
                            <p className="font-medium">{user.user}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaEnvelope className="text-blue-500" />
                        <div>
                            <p className="text-sm text-gray-600">Correo Electrónico</p>
                            <p className="font-medium">{user.email || 'No disponible'}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaBuilding className="text-blue-500" />
                        <div>
                            <p className="text-sm text-gray-600">Empresa</p>
                            <p className="font-medium">{user.empresa}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <button 
                        onClick={onClose} 
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Cerrar
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

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
            // Reload the user list after deletion
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

    const containerVariant = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { 
                delayChildren: 0.3, 
                staggerChildren: 0.2 
            } 
        },
    };

    const itemVariant = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        }
    };

    return (
        <motion.div 
            className="min-h-screen bg-gray-50 p-8"
            initial="hidden"
            animate="visible"
            variants={containerVariant}
        >
            <motion.div 
                className="container mx-auto bg-white shadow-xl rounded-2xl overflow-hidden"
                variants={itemVariant}
            >
                {/* Rest of the existing component remains the same */}
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
                                {datosTabla.map((usuario) => (
                                    <motion.tr 
                                        key={usuario._id} 
                                        className="border-b hover:bg-blue-50 transition"
                                        variants={itemVariant}
                                    >
                                        <td className="py-4 px-4">{usuario.nombres}</td>
                                        <td className="py-4 px-4">{usuario.apellidos}</td>
                                        <td className="py-4 px-4">{usuario.user}</td>
                                        <td className="py-4 px-4">{usuario.empresa}</td>
                                        <td className="py-4 px-4">
                                            <span className={`
                                                px-3 py-1 rounded-full text-xs font-bold
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
                                                >
                                                    <FaEdit />
                                                </motion.button>
                                                <motion.button 
                                                    onClick={() => handleDelete(usuario._id)}
                                                    className="text-red-500 hover:text-red-700"
                                                    whileHover={{ scale: 1.2 }}
                                                >
                                                    <FaTrash />
                                                </motion.button>
                                                <motion.button 
                                                    onClick={() => handleViewProfile(usuario._id)}
                                                    className="text-green-500 hover:text-green-700"
                                                    whileHover={{ scale: 1.2 }}
                                                >
                                                    <FaEye />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
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
                        // Reload users after update
                        fetchUsuarios();
                    }} 
                    userData={userDataModal} 
                />
            )}

            <CrearUsuarios 
                isOpen={isModalOpenUserCreate} 
                onClose={() => {
                    setIsModalOpenUserCreate(false);
                    // Reload users after creation
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