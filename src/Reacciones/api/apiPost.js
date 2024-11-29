import axios from 'axios';
import { serverUrl } from '../../Functions/config/serverUrl.config';

export const obtenerCalificaicones = async (formData, token) => {
    try {
        const response = await axios.post(serverUrl + `/calificacion/listar`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const crearCalificacion = async (token, formData) => {
    try {
        const response = await axios.post(serverUrl + `/calificacion`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};