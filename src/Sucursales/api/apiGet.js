import axios from 'axios';
import { serverUrl } from '../../Functions/config/serverUrl.config';

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

export const obtenerSucursales = async (token) => {
    try {
        const response = await axios.get(serverUrl + '/sucursal',{
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const obtenerSucursalId = async (idSucursal, token) => {
    try {
        const response = await axios.get(serverUrl + `/sucursal/${idSucursal}`, {

            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log('Datos obtenidos respuesta:', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const obtenerEmpresaId = async (idEmpresa, token) => {
    try {
        const response = await axios.get(serverUrl + `/empresa/${idEmpresa}`, {

            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};