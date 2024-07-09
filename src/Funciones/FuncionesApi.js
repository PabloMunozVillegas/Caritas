import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const makeRequest = async (method, url, data = null, token = null) => {
  try {
    const completeUrl = `${url}`;
    console.log('URL completa:', completeUrl);
    const config = {
      method,
      url: completeUrl,
      headers: { Authorization: `Bearer ${token}` },
      data,
    };

    const response = await axios(config);
    if (!response) {
      throw new Error('No se recibió respuesta del servidor');
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};


const loginAPIFunction = ({ method, url }) => {
  return async (data) => {
    const completeUrl = `${API_BASE_URL}${url}`;
    try {
      const response = await makeRequest(method, completeUrl, data);
      console.log('Respuesta del servidor:', response); 
      return response;
    } catch (error) {
      throw error;
    }
  };
};

const APIRoutes = {
  autenticacion: {
    login: { method: 'POST', url: '/api/autenticacion' },
  },
};

const APIFunctions = {};
Object.keys(APIRoutes).forEach((api) => {
  APIFunctions[api] = {};
  Object.keys(APIRoutes[api]).forEach((route) => {
    const urlProps = APIRoutes[api][route];
    if (route === 'login') {
      APIFunctions[api][route] = loginAPIFunction(urlProps);
    }
  });
});

export { APIFunctions };
