import React, { useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';
import Bienvenido from '../Paginas/Pagina-Administrador/Paginas/Bienvenido/Bienvenido';

//imports Empresa Carpeta
import CrearEmpresa from '../Empresa/pages/FormCrear.empresa';
import ListarEmpresas from '../Empresa/pages/TablaListar.empresa';
import EstadisticasEmpresa from '../Empresa/pages/Estadisticas.empresa';

//imports Sucursal Carpeta
import CrearSucursal from '../Sucursales/pages/FormCrear.sucursales';
import ListarSucursal from '../Sucursales/pages/TablaLisrtar.sucursales';
import EstadisticasSucursal from '../Sucursales/pages/Estadisticas.sucursales';

//imports Usuario Carpeta
import CrearUsuarios from '../Usuarios/pages/FormCrear.usuarios';
import ListarUsuarios from '../Usuarios/pages/TablaListar.usuarios';

//imports Reacciones Carpeta
import ListarReacciones from '../Reacciones/pages/Listar.reacciones';

//imports Correo Carpeta
import CrearCorreo from '../Email/pages/FormCrear.email';

//imports Componentes compartidos
import Sidebar from '../shared/layout/Sidebar';

export default function PaginaAdministrador({ isDarkMode, toggleDarkMode }) {
    const [activeComponent, setActiveComponent] = useState('Bienvenido');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const renderComponent = () => {
        const props = { isDarkMode };
        switch (activeComponent) {
            case 'Bienvenido':
                return <Bienvenido {...props} />;
            case 'CrearEmpresa':
                return <CrearEmpresa {...props} />;
            case 'ListarEmpresas':
                return <ListarEmpresas {...props} />;
            case 'EstadisticasEmpresa':
                return <EstadisticasEmpresa {...props} />;
            case 'CrearSucursal':
                return <CrearSucursal {...props} />;
            case 'ListarSucursal':
                return <ListarSucursal {...props} />;
            case 'EstadisticasSucursal':
                return <EstadisticasSucursal {...props} />;
            case 'CrearUsuarios':
                return <CrearUsuarios {...props} />;
            case 'ListarUsuarios':
                return <ListarUsuarios {...props} />;
            case 'ListarReacciones':
                return <ListarReacciones {...props} />;
            case 'CrearCorreo':
                return <CrearCorreo {...props} />;
            default:
                return <Bienvenido {...props} />;
        }
    };

    return (
        <div className={`flex h-screen ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-black'}`}>
            <Sidebar
                setActiveComponent={setActiveComponent}
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                isDarkMode={isDarkMode}
            />

            <div
                className={`flex-1 p-6 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}
            >
                <div className="flex justify-between items-center">
                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded ${isDarkMode ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-white'}`}
                    >
                        {isDarkMode ? (
                            <SunIcon className="h-6 w-6" />
                        ) : (
                            <MoonIcon className="h-6 w-6" />
                        )}
                    </button>
                </div>
                {renderComponent()}
            </div>

            {!isSidebarOpen && (
                <button
                    onClick={toggleSidebar}
                    className={`fixed left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-r-lg focus:outline-none shadow-md ${
                        isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-700 text-white'
                    }`}
                >
                    ☰
                </button>
            )}
        </div>
    );
}
