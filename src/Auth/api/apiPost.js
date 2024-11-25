import axios from 'axios';
import { serverUrl } from '../../Functions/config/serverUrl.config';

export const iniciarSesion = async (data) => {
  try {
    const response = await axios.post(serverUrl + '/autenticacion', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}