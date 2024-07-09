//Importamos las librerias necesarias
import React, { useState } from 'react';
//Importamos el css de la pagina
import './index.css'; 
//Importamos los componentes de las caras animadas
import ExcelenteAnimatedFace from './ComponentesCaras/ExcelenteFace';
import RegularAnimatedFace from './ComponentesCaras/RegularFace';
import MuyBuenaAnimatedFace from './ComponentesCaras/MuyBuenaFace';
import MalaAnimatedFace from './ComponentesCaras/MalaFace';
import MuyMalaAnimatedFace from './ComponentesCaras/MuyMalaFace';

//Importamos las funciones de la API
import { APIFunctions } from '../../Funciones/FuncionesApi'; 

//Creamos una funcion que engloba la paginas y sus funciones
function CarasSeleccionar() {
    //Creamos un estado donde almacenaremos el resultado de la calificacion enviada
    const [calificacionEnviada, setCalificacionEnviada] = useState(null);

    //Creamos una funcion que se encarga de enviar la calificacion al servidor
    const handleClick = async (calificacion) => {
        //Hacemos un try para ver si la peticion se ha podido hacer
        try {
            //Obtenemos el token de localStorage
            const token = localStorage.getItem('token'); 
            //Hacemos un console.log para ver el resultado de la peticion por buenas practicas comentar
            //console.log(calificacion);
            //Hacemos un await para esperar a que la peticion se haga pasando el token como segundo argumento y los datos
            await APIFunctions.calificacion.create({ nombre: calificacion, sucursal: 'string' }, token); 
            //Hacemos un set para actualizar el estado de la calificacion enviada
            setCalificacionEnviada(calificacion); 
            //Hacemos catch para ver si hay algun error
        } catch (error) {
            //En caso de que haya un error, lanzamos un error por buenas practicas comentar
            //console.error('Error al enviar la calificación a la API:', error);
        }
    };

    return (
        //Devolvemos el componente
        <div className="app-container">
            <div className="animated-face-container">
                <div className="animated-face" id="cara5" onClick={/*Envaiamos por el click del boton el valor de la cara5*/() => handleClick('Excelente')}>
                    <ExcelenteAnimatedFace />
                </div>
                <div className="animated-face" id="cara4" onClick={/*Envaiamos por el click del boton el valor de la cara4*/() => handleClick('Bueno')}>
                    <MuyBuenaAnimatedFace />
                </div>
                <div className="animated-face" id="cara3" onClick={/*Envaiamos por el click del boton el valor de la cara3*/() => handleClick('Regular')}>
                    <RegularAnimatedFace />
                </div>
                <div className="animated-face" id="cara2" onClick={/*Envaiamos por el click del boton el valor de la cara2*/() => handleClick('Mala')}>
                    <MalaAnimatedFace />
                </div>
                <div className="animated-face" id="cara1" onClick={/*Envaiamos por el click del boton el valor de la cara1*/() => handleClick('MuyMala')}>
                    <MuyMalaAnimatedFace />
                </div>
            </div>

            {/*Devolvemos el componente si la calificacion enviada es no nula para la nueva version esto deberia solo renderizar
            la cara seleccionada con el fondo que se buscara hacer */}
            {calificacionEnviada && (
                <p className="calificacion-enviada">Calificación enviada: {calificacionEnviada}</p>
            )}
        </div>
    );
}

export default CarasSeleccionar;
