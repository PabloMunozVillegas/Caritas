import React, { useState, useEffect } from 'react';                                                                                                         
import useApiFunctions from '../../Hoook/ApiFunc';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

function CarasSeleccionar({ isDarkMode }) {
  const [calificacionEnviada, setCalificacionEnviada] = useState(null);
  const [faceSelected, setFaceSelected] = useState(null);
  const { crearTodo } = useApiFunctions();
  const [selectedCount, setSelectedCount] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('contador', (data) => {
      setSelectedCount(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleClick = async (calificacion) => {
    const formulario = { nombre: calificacion };
    const response = await crearTodo('calificacion', null, formulario);
    console.log('Respuesta', response);
    if (response.status === 201) {
      setCalificacionEnviada(calificacion);
      setFaceSelected(calificacion);
      setTimeout(() => {
        setFaceSelected(null);
        setCalificacionEnviada(null);
      }, 3000);
      switch (calificacion) {
        case 'Excelente':
          navigate('/clientes/despedida/muybuena');
          break;
        case 'Bueno':
          navigate('/clientes/despedida/buena');
          break;
        case 'Regular':
          navigate('/clientes/despedida/regular');
          break;
        case 'Mala':  
          navigate('/clientes/despedida/mala');
          break;
        case 'MuyMala':  
          navigate('/clientes/despedida/muymala');            
          break;
        
      }
    } 
  };

  const faces = [
    { name: 'Excelente', imgSrc: '/Emogi/MuyBueno.jpg' },
    { name: 'Bueno', imgSrc: '/Emogi/Bueno.jpg' },
    { name: 'Regular', imgSrc: '/Emogi/Aceptable.jpg' },
    { name: 'Mala', imgSrc: '/Emogi/Deficiente.jpg' },
    { name: 'MuyMala', imgSrc: '/Emogi/Malo.jpg' },
  ];

  return (
    <div className='container mx-auto px-4 py-8 h-screen flex flex-col justify-center items-center relative' >
      <div className="absolute top-[5%] text-gray-500 text-[70px] font-now">
        VISITA #
        <br />
        <span className="absolute top-[40%] left-[30%] text-gray-500 text-[120px]">
          {selectedCount}
        </span>
      </div>
      <div className="absolute grid grid-cols-3 gap-4 mb-4 w-full max-w-4xl top-[28%]">
        {faces.slice(0, 3).map((face) => (
          <div key={face.name} className="flex justify-center" onClick={() => handleClick(face.name)}>
            <img
              src={isDarkMode ? face.darkImgSrc : face.imgSrc}
              alt={face.name}
              className="w-full h-auto object-contain cursor-pointer transition-transform hover:scale-105"
              style={{ maxWidth: '213px', maxHeight: '380px' }}
            />
          </div>
        ))}
        <div className="col-span-3 flex justify-center space-x-4">
          {faces.slice(3).map((face) => (
            <div key={face.name} className="flex justify-center" onClick={() => handleClick(face.name)}>
              <img
                src={isDarkMode ? face.darkImgSrc : face.imgSrc}
                alt={face.name}
                className="w-full h-auto object-contain cursor-pointer transition-transform hover:scale-105"
                style={{ maxWidth: '213px', maxHeight: '380px' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarasSeleccionar;
