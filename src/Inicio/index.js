import React from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

export const Inicio = () => {

    const navigate = useNavigate();
    const continuarClick = () => {
        navigate('/clientes/calificar');
    }

    return (
        <div className="flex items-center justify-center h-screen relative">
            <a className="absolute font-now leading-[80%] top-[26%] transform  text-[280px] tracking-[35px] text-gray-500">
                CALIF&Iacute;CA TU <br /> EXPERIENCIA
            </a>
            {/*<a className="absolute font-now top-[52%] border-2 border-gray-500 bg-gray-500 text-white px-4  text-[170px] tracking-[20px]">
                ¡Y GANA UN PREMIO!
            </a>*/}
            <a onClick={continuarClick} className="absolute border-4 border-gray-500  font-now leading-[95%] top-[75%] transform text-[120px] tracking-[15px] text-gray-500">
                PRESIONA AQUI
            </a>
            <Toaster />
        </div>
    );
};