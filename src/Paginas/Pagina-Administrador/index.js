import React, { useState } from 'react';

import Bienvenido from './Paginas/Bienvenido/Bienvenido';
import Sidebar from '../Componentes/SideBar';

export default function InicioPagina() {
    const [activeComponent, setActiveComponent] = useState('Bienvenido');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case 'Bienvenido':
                return <Bienvenido />;
            default:
                return <Bienvenido />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar Component */}
            <Sidebar
                setActiveComponent={setActiveComponent}
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />

            {/* Main Content Area */}
            <div
                className={`flex-1 p-6 transition-all duration-300 ease-in-out ${
                    isSidebarOpen ? 'ml-64' : 'ml-0'
                }`}
            >
                {renderComponent()}
            </div>

            {/* Sidebar Toggle Button */}
            {!isSidebarOpen && (
                <button
                    onClick={toggleSidebar}
                    className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-r-lg focus:outline-none shadow-md"
                >
                    ☰
                </button>
            )}
        </div>
    );
}