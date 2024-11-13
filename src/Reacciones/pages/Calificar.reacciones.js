import React, { useState, useEffect } from 'react';
import useApiFunctions from '../../Hoook/ApiFunc';
import { useNavigate } from 'react-router-dom';
import useScreenSize from "../../shared/hooks/useScreenSize";

function CarasSeleccionar({ isDarkMode }) {
  const [calificacionEnviada, setCalificacionEnviada] = useState(null);
  const [faceSelected, setFaceSelected] = useState(null);
  const { crearTodo } = useApiFunctions();
  const [selectedCount, setSelectedCount] = useState(0);
  const navigate = useNavigate();
  const { deviceType } = useScreenSize();

  const styles = {
    mobile: {
      container: "relative h-screen overflow-hidden",
      visitaText: "absolute font-now top-[5vh] left-1/2 -translate-x-1/2 text-gray-500 text-[40px]",
      visitaNumber: "absolute font-now top-[10vh] left-1/2 -translate-x-1/2 text-gray-500 text-[70px]",
      topRowContainer: "absolute top-[28vh] left-1/2 -translate-x-1/2 w-full grid grid-cols-3 gap-4 px-4",
      bottomRowContainer: "absolute top-[55vh] left-1/2 -translate-x-1/2 w-full flex justify-center gap-8 px-16",
      imageStyle: "w-full max-w-[150px] h-auto object-contain cursor-pointer transition-transform hover:scale-105"
    },
    tablet: {
      container: "relative h-screen overflow-hidden",
      visitaText: "absolute font-now top-[5vh] left-1/2 -translate-x-1/2 text-gray-500 text-[60px]",
      visitaNumber: "absolute font-now top-[10vh] left-1/2 -translate-x-1/2 text-gray-500 text-[90px]",
      topRowContainer: "absolute top-[28vh] left-1/2 -translate-x-1/2 w-full grid grid-cols-3 gap-6 px-20",
      bottomRowContainer: "absolute top-[53vh] left-1/2 -translate-x-1/2 w-full flex justify-center gap-20",
      imageStyle: "w-full max-w-[180px] h-auto object-contain cursor-pointer transition-transform hover:scale-105"
    },
    desktop: {
      container: "relative h-screen overflow-hidden",
      visitaText: "absolute font-now top-[5vh] left-1/2 -translate-x-1/2 text-gray-500 text-[4vw]",
      visitaNumber: "absolute font-now top-[10vh] left-1/2 -translate-x-1/2 text-gray-500 text-[7vw]",
      topRowContainer: "absolute top-[28vh] left-[50%] -translate-x-1/2 w-full grid grid-cols-3 gap-8 px-[22vw]",
      bottomRowContainer: "absolute top-[60vh] left-[50%] -translate-x-1/2 w-full flex justify-center gap-[9vw]",
      imageStyle: "w-full max-w-[10vw] h-auto object-contain cursor-pointer transition-transform hover:scale-105"
    }
  };

  const deviceStyles = styles[deviceType];

  useEffect(() => {
    const savedCount = localStorage.getItem('selectedCount');
    if (savedCount) {
      setSelectedCount(parseInt(savedCount, 10));
    } else {
      const randomCount = Math.floor(Math.random() * 1000) + 15000;
      setSelectedCount(randomCount);
      localStorage.setItem('selectedCount', randomCount);
    }
  }, []);

  const handleClick = async (calificacion) => {
    const newCount = selectedCount + 1;
    setSelectedCount(newCount);
    localStorage.setItem('selectedCount', newCount);

    const formulario = { nombre: calificacion };
    const response = await crearTodo('calificacion', null, formulario);
    
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
        default:
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
    <div className={deviceStyles.container}>
      <div className={deviceStyles.visitaText}>
        VISITA #
      </div>
      <div className={deviceStyles.visitaNumber}>
        {selectedCount}
      </div>

      <div className={deviceStyles.topRowContainer}>
        {faces.slice(0, 3).map((face) => (
          <div key={face.name} className="flex justify-center">
            <img
              src={isDarkMode ? face.darkImgSrc : face.imgSrc}
              alt={face.name}
              className={deviceStyles.imageStyle}
              onClick={() => handleClick(face.name)}
            />
          </div>
        ))}
      </div>

      <div className={deviceStyles.bottomRowContainer}>
        {faces.slice(3).map((face) => (
          <div key={face.name} className="flex justify-center">
            <img
              src={isDarkMode ? face.darkImgSrc : face.imgSrc}
              alt={face.name}
              className={deviceStyles.imageStyle}
              onClick={() => handleClick(face.name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarasSeleccionar;