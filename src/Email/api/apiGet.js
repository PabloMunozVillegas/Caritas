import axios from 'axios';
import { serverUrl } from '../../Functions/config/serverUrl.config';

export const enviarCorreo = async (token) => {
    try {
        const response = await axios.get(serverUrl + '/calificacion/email', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log('Datos obtenidos respuesta:', response);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const obtenerCorreos = async (token) => {
    try {
        const response = await axios.get(serverUrl + '/correos/listar/email', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log('Datos obtenidos respuesta:', response);
        return response.data;
    } catch (error) {
        throw error;
    }
};