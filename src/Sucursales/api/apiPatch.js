import axios from 'axios';
import { serverUrl } from '../../Functions/config/serverUrl.config';

export const actualizarSucursal = async (idSucursal, data, token) => {
    try {
        const response = await axios.patch(serverUrl + `/sucursal/${idSucursal}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};