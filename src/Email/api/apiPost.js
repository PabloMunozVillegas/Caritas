import axios from 'axios';
import { serverUrl } from '../../Functions/config/serverUrl.config';

export const crearCorreo = async (token, data) => {
    try {
        const response = await axios.post(serverUrl + '/correos/create/email', data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const crearCongfiguracion = async (token, data) => {
    try {
        const response = await axios.post(serverUrl + '/correos/create/configuracion', data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}