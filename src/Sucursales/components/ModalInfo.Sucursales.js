import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaUsers, 
    FaIdCard, 
    FaEnvelope, 
    FaBuilding, 
    FaTimes, 
    FaMapMarkerAlt,  // Distinctive icon for branch/location
    FaIndustry       // Distinctive icon for company
} from 'react-icons/fa';
import { obtenerSucursalId, obtenerEmpresaId } from '../api/apiGet';
import { useAuth } from '../../useContext';

const SucursalProfileModal = ({ user, isOpen, onClose }) => {
    const [sucursalDetails, setSucursalDetails] = useState(null);
    const [empresaDetails, setEmpresaDetails] = useState(null);

    const { token } = useAuth();

    useEffect(() => {
        const fetchSucursalAndEmpresa = async () => {
            try {
                // Obtener detalles de sucursales
                const sucursalResponses = await obtenerSucursalId(user.sucursal, token);
                setSucursalDetails(sucursalResponses);

                const empresaResponse = await obtenerEmpresaId(sucursalResponses.empresa, token);
                console.log('Datos obtenidos:', empresaResponse);
                setEmpresaDetails(empresaResponse);
    
            } catch (error) {
                console.error('Error al obtener sucursales o empresas:', error);
            }
        };

        if (isOpen) {
            fetchSucursalAndEmpresa();
        }
    }, [user, token, isOpen]);

    const modalVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.8,
            transition: {
                duration: 0.3
            }
        },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    };

    const contentVariants = {
        hidden: { 
            opacity: 0, 
            y: 20
        },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                delay: 0.2,
                duration: 0.5
            }
        }
    };

    if (!isOpen || !user) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div 
                        className="bg-white rounded-3xl shadow-2xl w-96 max-w-md overflow-hidden relative"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        {/* Close Button */}
                        <motion.button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaTimes size={24} />
                        </motion.button>

                        {/* Profile Header */}
                        <motion.div 
                            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-6 px-6 text-center relative"
                            variants={contentVariants}
                        >
                            <div className="absolute top-4 left-4">
                                <motion.div 
                                    className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <FaUsers size={48} className="text-white" />
                                </motion.div>
                            </div>
                            <div className="ml-28">
                                <h2 className="text-2xl font-bold">{user.nombres} {user.apellidos}</h2>
                                <p className="text-sm opacity-80 mt-1">Rol: {user.rol}</p>
                            </div>
                        </motion.div>

                        {/* Profile Details */}
                        <motion.div 
                            className="p-6 space-y-4"
                            variants={contentVariants}
                        >
                            <motion.div 
                                className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <FaIdCard className="text-blue-600" size={24} />
                                <div>
                                    <p className="text-xs text-gray-500">Nombre de Usuario</p>
                                    <p className="font-medium text-gray-800">{user.user}</p>
                                </div>
                            </motion.div>

                            {empresaDetails && (
                                <motion.div 
                                    className="flex items-center space-x-4 bg-blue-50 p-3 rounded-lg"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <FaIndustry className="text-blue-600" size={24} />
                                    <div>
                                        <p className="text-xs text-gray-500">Empresa</p>
                                        <p className="font-medium text-gray-800">{empresaDetails.nombre}</p>
                                    </div>
                                </motion.div>
                            )}

                            {sucursalDetails && (
                                <motion.div 
                                    className="flex items-center space-x-4 bg-green-50 p-3 rounded-lg"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <FaMapMarkerAlt className="text-green-600" size={24} />
                                    <div>
                                        <p className="text-xs text-gray-500">Sucursal</p>
                                        <p className="font-medium text-gray-800">{sucursalDetails.nombre}</p>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SucursalProfileModal;