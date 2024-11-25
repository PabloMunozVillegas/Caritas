import axios from 'axios';
import { serverUrl } from '../../Functions/config/serverUrl.config';

export const getUsuarios = async (token) => {
    try {
        const response = await axios.get(serverUrl + '/user',{
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};