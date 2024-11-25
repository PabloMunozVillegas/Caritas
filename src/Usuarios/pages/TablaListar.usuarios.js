import React, { useEffect, useState } from 'react';
import { getUsuarios } from '../api/apiGet';
import { useAuth } from '../../useContext';

const ListarUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await getUsuarios(token);
                console.log('Datos obtenidos:', data);
                setUsuarios(data);
            } catch (error) {
                console.error('Error fetching usuarios:', error);
            }
        };
        fetchUsuarios();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-6">Listar Usuarios</h1>
        
        </div>
    );
};

export default ListarUsuarios;