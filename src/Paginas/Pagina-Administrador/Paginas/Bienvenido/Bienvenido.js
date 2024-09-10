import React from 'react';

const Bienvenido = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-6">Bienvenido</h1>
            <p className="text-center text-gray-500">
                Bienvenido a la aplicación de gestión de ventas de productos.
            </p>
        </div>
    );
};

export default Bienvenido;