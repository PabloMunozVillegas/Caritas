import React from 'react';
import { useNavigate } from 'react-router-dom';
import useScreenSize from "../shared/hooks/useScreenSize";

export const Inicio = () => {
  const navigate = useNavigate();
  const { deviceType, width } = useScreenSize();

  const styles = {
    mobile: {
      heading: `absolute font-now top-[28%] left-[50%] -translate-x-1/2 text-gray-500 text-[${Math.min(10, width * 0.1)}vw] leading-[1em] tracking-[0.3em] w-full text-center`,
      subtitle: `absolute font-now top-[42%] left-1/2 -translate-x-1/2 bg-gray-500 text-white border-2 border-gray-500 text-[${Math.min(6, width * 0.06)}vw] tracking-[0.1em] px-3 py-2 text-center w-[90vw]`,
      button: `absolute font-now top-[60%] left-1/2 -translate-x-1/2 text-gray-500 border-2 border-gray-500 text-[${Math.min(6, width * 0.06)}vw] tracking-[0.1em] px-6 py-3 w-[70vw] hover:bg-gray-500 hover:text-white transition-colors duration-300`
    },
    tablet: {
      heading: `absolute font-now top-[20%] left-1/2 -translate-x-1/2 text-gray-500 text-[${Math.min(12, width * 0.12)}vw] leading-[1em] tracking-[0.2em] w-full text-center`,
      subtitle: `absolute font-now top-[40%] left-1/2 -translate-x-1/2 bg-gray-500 text-white border-2 border-gray-500 text-[${Math.min(7, width * 0.07)}vw] tracking-[0.1em] px-6 py-3 w-[90vw] text-center`,
      button: `absolute font-now top-[60%] left-1/2 -translate-x-1/2 text-gray-500 border-4 border-gray-500 text-[${Math.min(7, width * 0.07)}vw] tracking-[0.1em] px-8 py-4 w-[80vw] hover:bg-gray-500 hover:text-white transition-colors duration-300`
    },
    desktop: {
      heading: `absolute font-now top-[10%] left-1/2 -translate-x-1/2 text-gray-500 text-[${Math.min(9, width * 0.09)}vw] leading-[1em] tracking-[0.2em] w-full text-center`,
      subtitle: `absolute font-now top-[45%] left-1/2 -translate-x-1/2 bg-gray-500 text-white border-2 border-gray-500 text-[${Math.min(7, width * 0.07)}vw] tracking-[0.1em] px-7 py-4 w-[80vw] text-center`,
      button: `absolute font-now top-[75%] left-1/2 -translate-x-1/2 text-gray-500 border-4 border-gray-500 text-[${Math.min(5, width * 0.05)}vw] tracking-[0.1em] px-10 py-5 w-[50vw] hover:bg-gray-500 hover:text-white transition-colors duration-300`
    }
  };

  const deviceStyles = styles[deviceType];

  const handleClick = () => {
    navigate('/clientes/calificar');
  };

  return (
    <div className="flex items-center justify-center min-h-screen h-full relative overflow-hidden bg-white">
      <div className={deviceStyles.heading}>
        CALIF&Iacute;CA TU <br /> EXPERIENCIA
      </div>
      <div className={deviceStyles.subtitle}>
        ¡Y GANA UN PREMIO!
      </div>
      <button 
        onClick={handleClick}
        className={deviceStyles.button}
      >
        PRESIONA AQUI
      </button>
    </div>
  );
};
