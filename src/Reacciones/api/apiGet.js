import axios from 'axios';
import { serverUrl } from '../../Functions/config/serverUrl.config';

export const obtenerSucursalId = async (idSucursal, token) => {
    try {
        const response = await axios.get(serverUrl + `/sucursal/listar/${idSucursal}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const obtenerEmpresas = async (token) => {
    try {
        const response = await axios.get(serverUrl + '/empresa/listar',{
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};