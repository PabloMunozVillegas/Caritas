import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronUp, FaTimes, FaBars } from 'react-icons/fa';

const MenuItem = ({ label, onClick, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="mb-2">
            <button
                onClick={children ? handleToggle : onClick}
                className="flex items-center justify-between w-full text-left text-gray-300 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600"
            >
                {label}
                {children && (
                    isOpen ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />
                )}
            </button>
            {children && isOpen && (
                <ul className="ml-4 mt-2">
                    {React.Children.map(children, (child) =>
                        React.cloneElement(child, { className: 'mb-2' })
                    )}
                </ul>
            )}
        </div>
    );
};

const Sidebar = ({ setActiveComponent, isSidebarOpen, toggleSidebar }) => {
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

    return (
        <div
            ref={sidebarRef}
            className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 p-4 shadow-2xl rounded-tr-2xl rounded-br-2xl transition-transform duration-300 ease-in-out ${
                isSidebarOpen ? 'transform-none' : '-translate-x-full'
            }`}
        >
            <button
                onClick={toggleSidebar}
                className={`absolute top-4 right-4 text-white bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? 'rotate-0' : 'rotate-180'
                }`}
            >
                <FaTimes className={`transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'rotate-0' : 'rotate-45'}`} />
            </button>
            <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">Menu</h2>
            
            <div className="mb-6">
                <MenuItem label="Trafico" onClick={() => setActiveComponent('Trafico')}/>
            </div>
            <div className="mb-6">
                <MenuItem label="Gestion">
                    <MenuItem label="Indicadores por Sucursal" onClick={() => setActiveComponent('IndicadoresPorSucursal')} />
                    <MenuItem label="Indicadores por Fecha" onClick={() => setActiveComponent('IndicadoresPorFecha')}/>
                    <MenuItem label="Rendimiento Asesores de Venta" onClick={() => setActiveComponent('RendimientoAsesores')}/>
                </MenuItem>
            </div>
            <div className="mb-6"> 
                <MenuItem label="Comparativos" onClick={() => setActiveComponent('Comparaciones')} />
            </div>
        </div>
    );
};

export default Sidebar;