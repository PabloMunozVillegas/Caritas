import axios from 'axios';
import { serverUrl } from '../../Functions/config/serverUrl.config';

export const eliminarSucursal = async (id, token) => {
    try {
        const response = await axios.delete(serverUrl + `/sucursal/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};