import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { MdBusiness, MdStore, MdPerson, MdStar, MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAuth } from '../../useContext';

const MenuItem = ({ label, children, icon }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <motion.div 
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.button
                onClick={children ? handleToggle : undefined}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-between w-full text-left text-gray-200 hover:text-white transition-all duration-300 py-3 px-6 rounded-xl bg-gray-800 hover:bg-gray-700 hover:shadow-xl"
            >
                <div className="flex items-center">
                    {icon && <motion.span 
                        className="mr-3 text-gray-400"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                    >
                        {icon}
                    </motion.span>}
                    <span className="font-medium text-lg">{label}</span>
                </div>
                {children && (
                    isOpen ? 
                    <FaChevronUp className="w-5 h-5 text-gray-400" /> : 
                    <FaChevronDown className="w-5 h-5 text-gray-400" />
                )}
            </motion.button>
            <AnimatePresence>
                {children && isOpen && (
                    <motion.ul 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                            opacity: 1, 
                            height: 'auto',
                            transition: { 
                                duration: 0.3,
                                height: { duration: 0.2 }
                            }
                        }}
                        exit={{ 
                            opacity: 0, 
                            height: 0,
                            transition: { 
                                duration: 0.2,
                                height: { duration: 0.3 }
                            }
                        }}
                        className="ml-6 mt-2 space-y-2 overflow-hidden"
                    >
                        {React.Children.map(children, (child) => (
                            <motion.li
                                whileHover={{ 
                                    x: 10,
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {React.cloneElement(child, { 
                                    className: 'block py-2 px-6 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-all duration-300' 
                                })}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const { logout } = useAuth();
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (sidebarRef.current) {
                const sidebarWidth = sidebarRef.current.offsetWidth;
                if (event.clientX <= 20 && !isSidebarOpen) {
                    toggleSidebar();
                } else if (event.clientX > sidebarWidth + 20 && isSidebarOpen) {
                    toggleSidebar();
                }
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isSidebarOpen, toggleSidebar]);

    const handleLogout = () => {
        logout();
    };

    return (
        <motion.div
            ref={sidebarRef}
            initial={{ x: '-100%' }}
            animate={{ 
                x: isSidebarOpen ? 0 : '-100%',
                transition: { 
                    type: 'tween',
                    duration: 0.3 
                }
            }}
            className="fixed top-0 left-0 h-full bg-gradient-to-br from-gray-900 to-gray-800 text-white w-72 p-6 shadow-2xl rounded-tr-3xl rounded-br-3xl z-50"
        >
            <motion.button
                onClick={toggleSidebar}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 text-white bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition-all duration-300"
            >
                <FaTimes />
            </motion.button>
            
            <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4 text-transparent bg-clip-text bg-white"
            >
                CALIFICACION 
                ADMIN MENU
            </motion.h2>

            {/* Contenedor con scroll */}
            <div className="h-[calc(100vh-250px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                <MenuItem label="Empresa" icon={<MdBusiness className="h-6 w-6" />}>
                    <Link to="/admin/empresa/crear">Crear Empresa</Link>
                    <Link to="/admin/empresa/listar">Listar Empresas</Link>
                    <Link to="/admin/empresa/estadisticas">Estadísticas</Link>
                </MenuItem>
                <MenuItem label="Sucursal" icon={<MdStore className="h-6 w-6" />}>
                    <Link to="/admin/sucursal/crear">Crear Sucursal</Link>
                    <Link to="/admin/sucursal/listar">Listar Sucursal</Link>
                    <Link to="/admin/sucursal/estadisticas">Estadísticas Sucursal</Link>
                </MenuItem>
                <MenuItem label="Usuario" icon={<MdPerson className="h-6 w-6" />}>
                    <Link to="/admin/usuario/crear">Crear Usuario</Link>
                    <Link to="/admin/usuario/listar">Listar Usuario</Link>
                </MenuItem>
                <MenuItem label="Calificaciones" icon={<MdStar className="h-6 w-6" />}>
                    <Link to="/admin/calificaciones/listar">Listar Calificaciones</Link>
                </MenuItem>
                <MenuItem label="Correo" icon={<MdEmail className="h-6 w-6" />}>
                    <Link to="/admin/correo/crear">Crear Correo</Link>
                    <Link to="/admin/correo/listar">Listar Correo</Link>
                </MenuItem>
                
            </div>

            {/* Logout Button */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8"
            >
                <motion.button
                    onClick={handleLogout}
                    whileHover={{ 
                        scale: 1.05,
                        background: 'linear-gradient(to right, #ef4444, #b91c1c)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center w-full py-3 px-6 mt-4 text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-lg transition-all duration-300 group"
                >
                    <FaSignOutAlt className="mr-3 group-hover:rotate-12 transition-transform" /> Cerrar Sesión
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default Sidebar;