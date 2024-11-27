import axios from 'axios';
import { serverUrl } from '../../Functions/config/serverUrl.config';

export const actualizarUsuario = async (idUser,data, token) => {
    try {
        const response = await axios.patch(serverUrl + `/user/${idUser}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}