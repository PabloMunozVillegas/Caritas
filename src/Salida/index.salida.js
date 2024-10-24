import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Salida = () => {
    const navigate = useNavigate();
    const [inactive, setInactive] = useState(false);

    useEffect(() => {
        let timeout;
        const handleActivity = () => {
            clearTimeout(timeout); // Resetea el timeout si hay actividad
            timeout = setTimeout(() => {
                setInactive(true);
                navigate('/clientes'); // Redirigir a /lista si no hay actividad
            }, 3000); // 10 segundos de inactividad
        };

        // Escuchar eventos de actividad
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);
        window.addEventListener('touchstart', handleActivity);

        // Limpieza al desmontar el componente
        return () => {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            window.removeEventListener('touchstart', handleActivity);
            clearTimeout(timeout);
        };
    }, [navigate]);

    return (
        <div className="flex items-center justify-center h-screen relative">
            <img className="absolute top-[8%] w-[290px] h-[160px] bg-dark" src="/Logo.webp" alt="Muy Mala" />
            <a className="absolute font-now leading-[80%] top-[40%] transform  text-[170px] tracking-[15px] text-gray-500">
                ¡MUCHAS GRACIAS!
            </a>
            <a className="absolute font-now leading-[95%] top-[65%] transform text-[60px] tracking-[15px] text-gray-500">
                TE ENVIAMOS UN CUP&Oacute;N
            </a>
        </div>
    );
};