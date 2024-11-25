import axios from 'axios';
import  {serverUrl} from '../Functions/config/serverUrl.config';
import { useAuth } from '../useContext';

const useApiFunctions = () => {;
    const url = serverUrl;
    const Enlaces = {
        EnlacesGet: {
            listarEmpresa: url + '/empresa/listar',
            listarSucursal: url + '/sucursal',
            enviarEmail: url + '/calificacion/email',
        },
        EnlacesPost: {
            inicioSesion: url + '/autenticacion',
            calificacion: url + '/calificacion',
            crearEmpresa: url + '/empresa/create',
            crearSucursal: url + '/sucursal/create',
            crearUsuario: url + '/user/create',
            obtenerCalificaicones: url + '/calificacion/listar',
            crearEmail: url + '/correos/create/email',
            crearCongfiguracion: url + '/correos/create/configuracion',
        },
        EnlacesPatch: {
            // Define your PATCH endpoints here
        },
        EnlacesDelete: {
            // Define your DELETE endpoints here
        },
    };

    const { token } = useAuth();

        
    const obtenerTodo = async (endpoint, urlExtra, params) => {
        const extraUrl = urlExtra
            ? `${Enlaces.EnlacesGet[endpoint]}/${urlExtra}`
            : Enlaces.EnlacesGet[endpoint];

        try {
            const response = await axios.get(extraUrl, {
                params,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error; 
        }
    };


    const crearTodo = async (endpoint, urlExtra, data) => {
        const extraUrl = urlExtra
            ? `${Enlaces.EnlacesPost[endpoint]}/${urlExtra}`
            : Enlaces.EnlacesPost[endpoint];

        try {
            if (endpoint === 'inicioSesion') {
                const response = await axios.post(extraUrl, data);
                return response.data;
            }else {
                const response = await axios.post(extraUrl, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    };

    const actualizarTodo = async (endpoint, urlExtra, data) => {
        const extraUrlPatch = urlExtra
            ? `${Enlaces.EnlacesPatch[endpoint]}/${urlExtra}`
            : Enlaces.EnlacesPatch[endpoint];

        try {
            const response = await axios.patch(extraUrlPatch, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const borrarTodo = async (endpoint, urlExtra) => {
        const extraUrlDelete = urlExtra
            ? `${Enlaces.EnlacesDelete[endpoint]}/${urlExtra}`
            : Enlaces.EnlacesDelete[endpoint];
        try {
            const response = await axios.delete(extraUrlDelete, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return {
        obtenerTodo,
        crearTodo,
        actualizarTodo,
        borrarTodo
    };
};

export default useApiFunctions;