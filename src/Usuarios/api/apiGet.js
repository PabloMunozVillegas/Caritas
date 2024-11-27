import axios from 'axios';
import { serverUrl } from '../../Functions/config/serverUrl.config';

export const getUsuarios = async (token) => {
    try {
        const response = await axios.get(serverUrl + '/user/listar',{
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUsuarioId = async (id, token) => {
    try {
        const response = await axios.get(serverUrl + `/user/${id}`, {

            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getSucursal = async (idSucursal, token) => {
    try {
        const response = await axios.get(serverUrl + `/sucursal/${idSucursal}`, {

            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getEmpresa = async (idEmpresa, token) => {
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
}

export const getEmpresas = async (token) => {
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
}

export const getSucursales = async (idEmpresa,token) => {
    try {
        const response = await axios.get(serverUrl + `/sucursal/listar/${idEmpresa}`,{
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}