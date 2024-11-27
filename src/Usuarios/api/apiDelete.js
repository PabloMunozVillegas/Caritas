import axios from 'axios';
import { serverUrl } from '../../Functions/config/serverUrl.config';

export const eliminarUsuario = async (id, token) => {
    try {
        const response = await axios.delete(serverUrl + `/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};