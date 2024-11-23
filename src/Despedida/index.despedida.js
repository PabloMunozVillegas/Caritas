import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useScreenSize from "../shared/hooks/useScreenSize";

export const Despedida = () => {
    const [estado, setEstado] = useState('');
    const navigate = useNavigate();
    const [inactive, setInactive] = useState(false);
    const { deviceType, width, height } = useScreenSize();

    const styles = {
        mobile: {
            container: "flex flex-col items-center justify-between min-h-screen relative bg-white overflow-hidden",
            title: "absolute font-now top-[25%] left-1/2 -translate-x-1/2 text-gray-500 text-[13vw] leading-[1em] tracking-[0.2em] w-full text-center px-4",
            imageContainer: "absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] max-h-[25vh]",
            image: "w-[85vw] max-h-[35vh] object-contain",
            button: "absolute font-now top-[68%] left-1/2 -translate-x-1/2 text-gray-500 border-2 border-gray-500 text-[6vw] tracking-[0.1em] px-6 py-3 w-[80vw] text-center hover:bg-gray-500 hover:text-white transition-colors duration-300"
        },
        tablet: {
            container: "flex flex-col items-center justify-between min-h-screen relative bg-white overflow-hidden",
            title: "absolute font-now top-[20%] left-1/2 -translate-x-1/2 text-gray-500 text-[13vw] leading-[1em] tracking-[0.2em] w-full text-center px-6",
            imageContainer: "absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-h-[25vh]",
            image: "w-[75vw] max-h-[40vh] object-contain",
            button: "absolute font-now top-[70%] left-1/2 -translate-x-1/2 text-gray-500 border-4 border-gray-500 text-[6vw] tracking-[0.15em] px-8 py-4 w-[70vw] text-center hover:bg-gray-500 hover:text-white transition-colors duration-300"
        },
        desktop: {
            container: "flex flex-col items-center justify-between min-h-screen relative bg-white overflow-hidden",
            title: "absolute font-now top-[20%] left-1/2 -translate-x-1/2 text-gray-500 text-[9vw] leading-[1em] tracking-[0.2em] w-full text-center px-8",
            imageContainer: "absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2",
            image: "w-[50vw] h-[45vh] object-contain",
            button: "absolute font-now top-[90%] left-1/2 -translate-x-1/2 text-gray-500 border-4 border-gray-500 text-[4vw] tracking-[0.1em] px-8 py-3 w-[45vw] text-center hover:bg-gray-500 hover:text-white transition-colors duration-300"
        }
    };

    const deviceStyles = styles[deviceType];

    useEffect(() => {
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

    useEffect(() => {
        let timeout;

        const startInactivityTimer = () => {
            // Si ya está configurado el timeout, no hace nada.
            if (!timeout) {
                timeout = setTimeout(() => {
                    setInactive(true);
                    navigate('/clientes/salida');
                }, 3000); // Siempre 3 segundos
            }
        };

        const handleActivity = () => {
            // Si hay actividad, simplemente se asegura de que no está inactivo.
            setInactive(false);
        };

        // Inicia el temporizador de inactividad cuando se monta el componente.
        startInactivityTimer();

        // Agrega los eventos de actividad.
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);
        window.addEventListener('touchstart', handleActivity);

        return () => {
            // Limpia los eventos y el temporizador cuando el componente se desmonta.
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            window.removeEventListener('touchstart', handleActivity);
            clearTimeout(timeout);
        };
    }, [navigate]);

    const getTitleText = () => {
        const titles = {
            'Muy Buena': 'MUY BUENO',
            'Buena': 'BUENO',
            'Regular': 'ACEPTABLE',
            'Mala': 'DEFICIENTE',
            'Muy Mala': 'MALO'
        };
        return titles[estado] || 'Cargando...';
    };

    const renderFace = () => {
        if (estado === '') {
            return <div>Cargando...</div>;
        }
        
        const gifs = {
            'Muy Buena': 'Excelente',
            'Buena': 'Buena',
            'Regular': 'Regular',
            'Mala': 'Mala',
            'Muy Mala': 'MuyMala'
        };

        return (
            <div className={deviceStyles.imageContainer}>
                <img 
                    className={deviceStyles.image}
                    src={`/gifsEmogis/${gifs[estado]}.gif`}
                    alt={estado}
                />
            </div>
        );
    };

    const handleRegalo = () => {
        navigate('/clientes/regalo');
    };

    return (
        <div className={deviceStyles.container}>
            {estado === '' ? (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h1 className="text-4xl font-bold">Cargando...</h1>
                </div>
            ) : (
                <>
                    <div className={deviceStyles.title}>
                        {getTitleText()}
                    </div>
                    {renderFace()}
                    {/*<button 
                        onClick={handleRegalo} 
                        className={deviceStyles.button}
                    >
                        OBTENER REGALO
                    </button>*/}
                </>
            )}
        </div>
    );
};

export default Despedida;