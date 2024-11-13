import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import useScreenSize from '../shared/hooks/useScreenSize';

export const Formulario = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const { deviceType } = useScreenSize();

  const styles = {
    mobile: {
      container: "flex border-2 border-gray-500 flex-col items-center justify-center min-h-screen w-full bg-white space-y-8 sm:space-y-12 md:space-y-16",
      label: "absolute left-0 sm:-left-[5%] top-[-60px] sm:top-[-75px] md:top-[-90px] text-4xl sm:text-5xl md:text-6xl font-now text-gray-500 tracking-wide uppercase font-light w-full text-center whitespace-nowrap",
      input: "w-full h-12 sm:h-14 md:h-16 border-2 border-gray-400 rounded-md focus:outline-none px-6 sm:px-8 md:px-10 text-base mt-4",
      phoneLabel: "absolute left-0 sm:-left-[25%] md:-left-[35%] top-[-60px] sm:top-[-75px] md:top-[-90px] text-4xl sm:text-5xl md:text-6xl font-now text-gray-500 tracking-wide uppercase font-light w-full text-center whitespace-nowrap",
      phoneInputStyle: {
        width: '100%',
        height: '60px',
        border: '2px solid #d1d5db',
        borderRadius: '0',
        fontSize: '16px',
        backgroundColor: 'white',
        marginTop: '4rem',
        '@media (min-width: 640px)': {
          height: '65px',
          fontSize: '18px'
        },
        '@media (min-width: 768px)': {
          height: '70px',
          fontSize: '20px'
        }
      },
      phoneButtonStyle: {
        border: '2px solid #d1d5db',
        borderRadius: '0',
        backgroundColor: 'white'
      },
      phoneContainerStyle: {
        border: '2px solid #d1d5db',
        borderRadius: '0'
      },
      button: "w-full max-w-lg h-10 sm:h-12 md:h-14 bg-gray-500 text-white font-now text-xl sm:text-2xl md:text-3xl tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase font-light"
    },
    tablet: {
      container: "flex border-2 border-gray-500 flex-col items-center justify-center min-h-screen w-full bg-white space-y-12 lg:space-y-16 xl:space-y-20",
      label: "absolute left-0 lg:-left-[5%] top-[-75px] lg:top-[-90px] text-5xl lg:text-6xl xl:text-7xl font-now text-gray-500 tracking-wide uppercase font-light w-full text-center whitespace-nowrap",
      input: "w-full h-14 lg:h-16 xl:h-18 border-2 border-gray-400 rounded-md focus:outline-none px-8 lg:px-10 xl:px-12 text-base mt-6",
      phoneLabel: "absolute left-0 lg:-left-[35%] top-[-75px] lg:top-[-90px] text-5xl lg:text-6xl xl:text-7xl font-now text-gray-500 tracking-wide uppercase font-light w-full text-center whitespace-nowrap",
      phoneInputStyle: {
        width: '100%',
        height: '70px',
        border: '2px solid #d1d5db',
        borderRadius: '0',
        fontSize: '20px',
        backgroundColor: 'white',
        marginTop: '4rem',
        '@media (min-width: 1024px)': {
          height: '75px',
          fontSize: '22px'
        },
        '@media (min-width: 1280px)': {
          height: '80px',
          fontSize: '24px'
        }
      },
      phoneButtonStyle: {
        border: '2px solid #d1d5db',
        borderRadius: '0',
        backgroundColor: 'white'
      },
      phoneContainerStyle: {
        border: '2px solid #d1d5db',
        borderRadius: '0'
      },
      button: "w-full max-w-lg h-12 lg:h-14 xl:h-16 bg-gray-500 text-white font-now text-2xl lg:text-3xl xl:text-4xl tracking-[0.25em] lg:tracking-[0.3em] xl:tracking-[0.4em] uppercase font-light"
    },
    desktop: {
      container: "flex flex-col items-center justify-center min-h-screen w-full bg-white space-y-16 2xl:space-y-20",
      label: "absolute left-[-4vw] 2xl:left-[-14vw] top-[-4vw] 2xl:top-[-8vw] text-[5vw] 2xl:text-[6vw] font-now text-gray-500 tracking-wide uppercase font-light w-full text-center whitespace-nowrap",
      input: "w-full h-[8vh] 2xl:h-[8vh] border-2 border-gray-400 rounded-md focus:outline-none px-10 2xl:px-12 text-base mt-8",
      phoneLabel: "absolute left-[-30%] 2xl:left-[-35%] top-[-75px] 2xl:top-[-90px] text-7xl 2xl:text-8xl font-now text-gray-500 tracking-wide uppercase font-light w-full text-center whitespace-nowrap",
      phoneInputStyle: {
        width: '100%',
        height: '80px',
        border: '2px solid #d1d5db',
        borderRadius: '0',
        fontSize: '22px',
        backgroundColor: 'white',
        marginTop: '4rem',
        '@media (min-width: 1536px)': {
          height: '90px',
          fontSize: '24px'
        }
      },
      phoneButtonStyle: {
        border: '2px solid #d1d5db',
        borderRadius: '0',
        backgroundColor: 'white'
      },
      phoneContainerStyle: {
        border: '2px solid #d1d5db',
        borderRadius: '0'
      },
      button: "w-full max-w-lg h-14 2xl:h-16 bg-gray-500 text-white font-now text-3xl 2xl:text-4xl tracking-[0.3em] 2xl:tracking-[0.4em] uppercase font-light"
    }
  };

  const deviceStyles = styles[deviceType];
  const redirigir = useNavigate();

  const handleSubmit = () => {
    console.log('Datos enviados:', { nombre: name, telefono: phone });
    redirigir('/clientes/salida');
  };

  return (
    <div className={deviceStyles.container}>
      <div className="relative w-full max-w-lg mb-10">
        <label className={deviceStyles.label}>INGRESE SU NOMBRE</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={deviceStyles.input} 
        />
      </div>
      <div className="relative w-full max-w-lg mb-10">
        <label className={deviceStyles.phoneLabel}>INGRESE SU NUMERO DE TELEFONO</label>
        <PhoneInput
          country={'bo'}
          value={phone}
          onChange={(value) => setPhone(value)}
          inputStyle={deviceStyles.phoneInputStyle}
          buttonStyle={deviceStyles.phoneButtonStyle}
          containerStyle={deviceStyles.phoneContainerStyle}
        />
      </div>
      <button
        onClick={handleSubmit}
        className={deviceStyles.button}
      >
        INGRESAR
      </button>
    </div>
  );
};