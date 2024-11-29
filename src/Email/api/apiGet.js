import axios from 'axios';
import { serverUrl } from '../../Functions/config/serverUrl.config';

export const obtenerCorreo = async (token) => {
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