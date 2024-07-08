import axios from "axios";

const serverUrl = 'https://0fwwkqtc-5000.brs.devtunnels.ms';

const urls = {
    calificacion: {
        post: `${serverUrl}/api/calificacion`,
    }
};

const CalificacionApiPostFunction = async (data) => {
    try {
        const response = await axios.post(urls.calificacion.post, data);
        console.log('Function Api',response.data);
        return response.data; 
    } catch (error) {
        console.error('Error en CalificacionApiPostFunction:', error);
        throw error;
    }
};

export default CalificacionApiPostFunction;
