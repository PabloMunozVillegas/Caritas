import axios from 'axios';
import { serverUrl } from '../../Functions/config/serverUrl.config';

export const crearEmpresa = async (data, token) => {
    try {
        const response = await axios.post(serverUrl + '/empresa/create', data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}