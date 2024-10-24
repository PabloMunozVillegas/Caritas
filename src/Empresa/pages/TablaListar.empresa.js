import React, { useEffect, useState } from 'react';
import useApiFunctions from '../../Hoook/ApiFunc';

const ListarEmpresas = () => {
    const [empresas, setEmpresas] = useState([]);
    const { obtenerTodo } = useApiFunctions(); 

    const fetchEmpresas = async () => {
        try {
            const data = await obtenerTodo('listarEmpresa'); 
            console.log('datos', data); 
            setEmpresas(data); 
        } catch (error) {
            console.error('Error fetching empresas:', error);
        }
    };

    useEffect(() => {
        fetchEmpresas();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Lista de Empresas</h1>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Nombre</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empresas.map((empresa, index) => (
                            <tr key={empresa._id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition duration-300`}>
                                <td className="py-3 px-6 text-gray-700 font-medium">{empresa.nombre}</td>
                                <td className="py-3 px-6 text-gray-500">{new Date(empresa.fecha).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListarEmpresas;
