import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Si estás usando react-router-dom para la navegación

export const Despedida = () => {
    const [estado, setEstado] = useState('');
    const navigate = useNavigate();
    const [inactive, setInactive] = useState(false);

    useEffect(() => {
        // Definir ruta según el pathname
        switch (window.location.pathname) {
            case '/clientes/despedida/muybuena':
                setEstado('Muy Buena');
                break;
            case '/clientes/despedida/buena':
                setEstado('Buena');
                break;
            case '/clientes/despedida/regular':
                setEstado('Regular');
                break;
            case '/clientes/despedida/mala':
                setEstado('Mala');
                break;
            case '/clientes/despedida/muymala':
                setEstado('Muy Mala');
                break;
            default:
                setEstado('');
        }
    }, []);

    // useEffect para detectar inactividad
    useEffect(() => {
        let timeout;
        const handleActivity = () => {
            clearTimeout(timeout); // Resetea el timeout si hay actividad
            timeout = setTimeout(() => {
                setInactive(true);
                navigate('/clientes/salida'); // Redirigir a /lista si no hay actividad
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

    const renderFace = () => {
        if (estado === '') {
            return <div>Cargando...</div>;
        } else if (estado === 'Muy Buena') {
            return <img className='w-[620px] h-[460px]' src="/gifsEmogis/Excelente.gif" alt="Muy Buena" />;
        } else if (estado === 'Buena') {
            return <img className='w-[620px] h-[460px]' src="/gifsEmogis/Buena.gif" alt="Buena" />;
        } else if (estado === 'Regular') {
            return <img className='w-[620px] h-[460px]' src="/gifsEmogis/Regular.gif" alt="Regular" />;
        } else if (estado === 'Mala') {
            return <img className='w-[620px] h-[460px]' src="/gifsEmogis/Mala.gif" alt="Mala" />;
        } else if (estado === 'Muy Mala') {
            return <img className='w-[620px] h-[460px]' src="/gifsEmogis/MuyMala.gif" alt="Muy Mala" />;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 h-screen flex flex-col justify-center items-center relative">
            {estado === '' && (
                <div>
                    <h1 className="text-4xl font-bold mb-6">Cargando...</h1>
                </div>
            )}
            {estado === 'Muy Buena' && (
                 <a className='absolute font-now leading-[80%] top-[10%] transform text-[200px] tracking-[15px] text-gray-500'>
                    MUY BUENO
                </a>
            )}
            {estado === 'Buena' && (
                 <a className='absolute font-now leading-[80%] top-[10%] transform text-[200px] tracking-[15px] text-gray-500'>
                    BUENO
                </a>
            )}
            {estado === 'Regular' && (
                 <a className='absolute font-now leading-[80%] top-[10%] transform text-[200px] tracking-[15px] text-gray-500'>
                    ACEPTABLE
                </a>
            )}
            {estado === 'Mala' && (
                 <a className='absolute font-now leading-[80%] top-[10%] transform text-[200px] tracking-[15px] text-gray-500'>
                    DEFICIENTE
                </a>
            )}
            {estado === 'Muy Mala' && (
                <a className='absolute font-now leading-[80%] top-[10%] transform text-[200px] tracking-[15px] text-gray-500'>
                    MALO
                </a>
            )}

            <div className="face-container">
                {renderFace()}
            </div>
        </div>
    );
};
