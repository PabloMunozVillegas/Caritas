import axios from 'axios';
import { serverUrl } from '../../Functions/config/serverUrl.config';

export const eliminarCorreo = async (token, id) => {
    try {
        const response = await axios.delete(serverUrl + `/correos/gmail/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }    
};