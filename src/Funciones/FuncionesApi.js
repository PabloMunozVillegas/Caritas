import axios from 'axios';
//Creamos una constante con la URL del servidor
const API_BASE_URL = 'http://localhost:5000';

//Creamos una funcion en donde asincronamente debemos pedir el metodo, la url, los datos y el token
//Donde los datos y el token son nulos ya que se envian en el body de la peticion
const makeRequest = async (method, url, data = null, token = null) => {
  //Hacemos un try para ver si la peticion se ha podido hacer
  try {
    //Declaramos la url completa
    const completeUrl = `${url}`;
    //Declaramos la configuracion de la peticion
    const config = {
      //Aqui se agrega el metodo a la peticion
      method,
      //Aqui se agrega la url a la peticion
      url: completeUrl,
      headers: {
        //Aqui se agrega el token a la cabecera
        Authorization: `Bearer ${token}`,
        //Aqui se agrega el tipo de contenido a la cabecera
        'Content-Type': 'application/json'  
      },
      //Aqui se agrega los datos a la peticion
      data,
    };
    //Declaramos la respuesta de la peticion
    const response = await axios(config);
    //Hacemos un if para ver si la peticion se ha podido hacer
    if (!response) {
      //Si no se ha podido hacer, lanzamos un error
      throw new Error('No se recibió respuesta del servidor');
    }
    //Devolvemos la respuesta de la peticion
    return response.data;
    //Hacemos un catch para ver si hay algun error
  } catch (error) {
    //Si hay algun error, lanzamos un error
    throw error;
  }
};

//Creamos una funcion para el login pidiendo el metodo, la url 
const loginAPIFunction = ({ method, url }) => {
  //Creamos una funcion asincrona que pida el metodo, la url y los datos por el cuerpo de la peticion
  return async (data) => {
    //Declaramos la url completa
    const completeUrl = `${API_BASE_URL}${url}`;
    //Hacemos un try para ver si la peticion se ha podido hacer
    try {
      //Declaramos la respuesta de la peticion
      const response = await makeRequest(method, completeUrl, data);
      //Cargamos la respuesta por buenas practicas comentar
      //console.log('Respuesta del servidor:', response);
      //Devolvemos la respuesta de la peticion
      return response;
      //Hacemos un catch para ver si hay algun error
    } catch (error) {
      //Si hay algun error, lanzamos un error
      throw error;
    }
  };
};

//Creamos una funcion para el create pidiendo el metodo, la url
const createAPIFunction = ({ method, url }) => {
  //Creamos una funcion asincrona que pida el metodo, la url y los datos y el tokenpor el cuerpo de la peticion
  return async (data, token) => { 
    //Declaramos la url completa
    const completeUrl = `${API_BASE_URL}${url}`;
    //Hacemos un try para ver si la peticion se ha podido hacer
    try {
      //Declaramos la respuesta de la peticion
      const response = await makeRequest(method, completeUrl, data, token); 
      //Cargamos la respuesta por buenas practicas comentar
      //console.log('Respuesta del servidor (crear calificación):', response); 
      //Devolvemos la respuesta de la peticion
      return response;
      //Hacemos un catch para ver si hay algun error
    } catch (error) {
      //Si hay algun error, lanzamos un error
      throw error;
    }
  };
};

//Creamos un objeto con las rutas de la API
const APIRoutes = {
  //Aqui se declara el objeto autenticacion
  autenticacion: {
    //Aqui se declara la ruta login
    login: { method: 'POST', url: '/api/autenticacion' },
  },
  //Aqui se declara el objeto calificacion
  calificacion: {
    //Aqui se declara la ruta create
    create: { method: 'POST', url: '/api/calificacion' },
  },
};

//Creamos un objeto donde almacenaremos las funciones de la API
const APIFunctions = {};
//Hacemos un bucle para recorrer cada una de las rutas de la API
Object.keys(APIRoutes).forEach((api) => {
  //En cada una de las rutas de la API, creamos un objeto donde almacenaremos las funciones de la ruta
  APIFunctions[api] = {};
  //Buscamos cada una de las rutas de la API
  Object.keys(APIRoutes[api]).forEach((route) => {
    //Obtenemos las propiedades de la ruta
    const urlProps = APIRoutes[api][route];
    //Hacemos un if para ver si la ruta es login
    if (route === 'login') {
      //En caso de que la ruta sea login, creamos la funcion asincrona que recibe los datos
      APIFunctions[api][route] = loginAPIFunction(urlProps);
      //Si la ruta es create
    } else if (route === 'create') {
      //En caso de que la ruta sea create, creamos la funcion asincron que recibe los datos y el token 
      APIFunctions[api][route] = createAPIFunction(urlProps);
    }
  });
});

export { APIFunctions };
