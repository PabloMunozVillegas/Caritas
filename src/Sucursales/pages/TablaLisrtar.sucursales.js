import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaEye, FaPlus, FaBuilding } from 'react-icons/fa';
import toast, { Toaster } from "react-hot-toast";
import CrearSucursales from '../components/ModalFormCrear.Sucursales';
import EditarSucursales from '../components/ModalFormEditar.Sucursales';
import SucursalProfileModal from '../components/ModalInfo.Sucursales';
import { obtenerSucursales, obtenerSucursalId, obtenerEmpresaId} from '../api/apiGet'; 
import { eliminarSucursal } from '../api/apiDelete';
import { useAuth } from '../../useContext';

const ListarSucursales = () => {
    const [datosTabla, setDatosTabla] = useState([]);
    const [sucursalDataModal, setSucursalDataModal] = useState(null);
    const [selectedSucursal, setSelectedSucursal] = useState(null);
    const [isModalOpenSucursalCreate, setIsModalOpenSucursalCreate] = useState(false);
    const [isModalOpenSucursalUpdate, setIsModalOpenSucursalUpdate] = useState(false);
    const [isModalOpenSucursalProfile, setIsModalOpenSucursalProfile] = useState(false);
    const { token } = useAuth();

    const fetchSucursales = async () => {
        try {
            const sucursales = await obtenerSucursales(token);
            
            const sucursalesConEmpresas = await Promise.all(
                sucursales.map(async (sucursal) => {
                    const empresa = await obtenerEmpresaId(sucursal.empresa, token);
                    return { ...sucursal, empresa };
                })
            );
            console.log('Datos obtenidos:', sucursalesConEmpresas);
            // Set the updated data with empresa information
            setDatosTabla(sucursalesConEmpresas);
    
            toast.success('Sucursales obtenidas exitosamente', {
                style: { background: '#333', color: '#fff' },
            });
        } catch (error) {
            toast.error('Error al obtener sucursales', {
                style: { background: '#ff4b4b', color: '#fff' },
            });
        }
    };

    useEffect(() => {
        fetchSucursales();
    }, [token]);

    const handleEdit = async (id) => {
        try {
            const sucursal = await obtenerSucursalId(id, token);
            setSucursalDataModal(sucursal);
            setIsModalOpenSucursalUpdate(true);
        } catch (error) {
            toast.error("Error al obtener sucursal");
        }
    };

    const handleDelete = async (id) => {
        try {
            await eliminarSucursal(id, token);
            toast.success('Sucursal eliminada exitosamente');
            await fetchSucursales();
        } catch (error) {
            toast.error('Error al eliminar sucursal');
        }
    };

    const handleViewProfile = async (id) => {
        try {
            const sucursal = await obtenerSucursalId(id, token);
            setSelectedSucursal(sucursal);
            setIsModalOpenSucursalProfile(true);
        } catch (error) {
            toast.error('Error al obtener detalles de la sucursal');
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } },
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
                <div className="p-6 bg-gradient-to-r from-green-600 to-green-400 text-white flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <FaBuilding size={32} />
                        <h1 className="text-3xl font-bold tracking-wide">Gestión de Sucursales</h1>
                    </div>
                    <motion.button
                        onClick={() => setIsModalOpenSucursalCreate(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaPlus />
                        <span>Añadir Sucursal</span>
                    </motion.button>
                </div>
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                                    <th className="py-3 px-4 text-left">Nombre</th>
                                    <th className="py-3 px-4 text-left">Empresa</th>
                                    <th className="py-3 px-4 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {datosTabla.map((datosTablas) => (
                                        <motion.tr
                                            key={datosTablas._id}
                                            className="border-b hover:bg-green-50 transition"
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit={{ opacity: 0, height: 0 }}
                                        >
                                            <td className="py-4 px-4">{datosTablas.nombre}</td>
                                            <td className="py-4 px-4">{datosTablas.empresa.nombre}</td>
                                            <td className="py-4 px-4 text-center">
                                                <div className="flex justify-center space-x-3">
                                                    <motion.button
                                                        onClick={() => handleEdit(datosTablas._id)}
                                                        className="text-blue-500 hover:text-blue-700"
                                                        whileHover={{ scale: 1.2 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <FaEdit />
                                                    </motion.button>
                                                    <motion.button
                                                        onClick={() => handleDelete(datosTablas._id)}
                                                        className="text-red-500 hover:text-red-700"
                                                        whileHover={{ scale: 1.2 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <FaTrash />
                                                    </motion.button>
                                                    <motion.button
                                                        onClick={() => handleViewProfile(datosTablas._id)}
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

            {sucursalDataModal && (
                <EditarSucursales
                    isOpen={isModalOpenSucursalUpdate}
                    onClose={() => {
                        setIsModalOpenSucursalUpdate(false);
                        setSucursalDataModal(null);
                        fetchSucursales();
                    }}
                    sucursalData={sucursalDataModal}
                />
            )}

            <CrearSucursales
                isOpen={isModalOpenSucursalCreate}
                onClose={() => {
                    setIsModalOpenSucursalCreate(false);
                    fetchSucursales();
                }}
            />

            <SucursalProfileModal
                sucursal={selectedSucursal}
                isOpen={isModalOpenSucursalProfile}
                onClose={() => setIsModalOpenSucursalProfile(false)}
            />

            <Toaster position="top-right" reverseOrder={false} />
        </motion.div>
    );
};

export default ListarSucursales;
