import React, { useState, useEffect } from 'react';
import useApiFunctions from '../../Hoook/ApiFunc';

function CarasSeleccionar() {
  const [calificacionEnviada, setCalificacionEnviada] = useState(null);
  const [faceSelected, setFaceSelected] = useState(null);
  const { crearTodo } = useApiFunctions();

  const handleClick = async (calificacion) => {
    const formulario = {
      nombre: calificacion
    };
    const response = await crearTodo('calificacion', null, formulario);
    console.log('Respuesta', response);
    setCalificacionEnviada(calificacion);
    setFaceSelected(calificacion);

    // Resetear la selección después de 3 segundos
    setTimeout(() => {
      setFaceSelected(null);
      setCalificacionEnviada(null);
    }, 3000);
  };

  const faces = [
    { name: 'Excelente', src: '/Emogi/MuyBueno.jpg', message: '¡Excelente! Gracias por tu calificación.' },
    { name: 'Bueno', src: '/Emogi/Bueno.jpg', message: '¡Muy bueno! Gracias por tu calificación.' },
    { name: 'Regular', src: '/Emogi/Aceptable.jpg', message: 'Regular, trabajaremos para mejorar.' },
    { name: 'Mala', src: '/Emogi/Deficiente.jpg', message: 'Lo sentimos, mejoraremos para ti.' },
    { name: 'MuyMala', src: '/Emogi/Malo.jpg', message: 'Lamentamos tu experiencia, mejoraremos.' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 h-screen flex flex-col justify-center items-center">
      {!faceSelected ? (
        <div className="grid grid-cols-3 gap-4 mb-4 w-full max-w-4xl">
          {faces.slice(0, 3).map((face) => (
            <div 
              key={face.name} 
              className="flex justify-center"
              onClick={() => handleClick(face.name)}
            >
              <img 
                src={face.src} 
                alt={face.name} 
                className="w-full h-auto object-contain cursor-pointer transition-transform hover:scale-105"
                style={{maxWidth: '213px', maxHeight: '380px'}}
              />
            </div>
          ))}
          <div className="col-span-3 flex justify-center space-x-4">
            {faces.slice(3).map((face) => (
              <div 
                key={face.name} 
                className="flex justify-center"
                onClick={() => handleClick(face.name)}
              >
                <img 
                  src={face.src} 
                  alt={face.name} 
                  className="w-full h-auto object-contain cursor-pointer transition-transform hover:scale-105"
                  style={{maxWidth: '213px', maxHeight: '380px'}}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <img 
            src={faces.find(f => f.name === faceSelected).src} 
            alt={faceSelected} 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      {calificacionEnviada && (
        <div className="absolute bottom-0 left-0 right-0 text-center mt-4 p-4 ">
          <p>{faces.find(f => f.name === calificacionEnviada).message}</p>
        </div>
      )}
    </div>
  );
}

export default CarasSeleccionar;