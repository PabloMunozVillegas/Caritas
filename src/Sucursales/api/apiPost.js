import axios from 'axios';
import { serverUrl } from '../../Functions/config/serverUrl.config';

export const crearSucursal = async (data, token) => {
    try {
        const response = await axios.post(serverUrl + '/sucursal/create', data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}