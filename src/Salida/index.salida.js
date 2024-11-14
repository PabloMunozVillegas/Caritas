import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useScreenSize from "../shared/hooks/useScreenSize";

export const Salida = () => {
    const navigate = useNavigate();
    const [inactive, setInactive] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setInactive(true);
            navigate('/clientes'); // Redirige a /clientes después de 3 segundos de inactividad
        }, 3000);

        const handleClick = () => {
            clearTimeout(timeout); // Cancela el timeout si hay un clic
        };

        // Escuchar evento de clic
        window.addEventListener('click', handleClick);

        // Limpieza al desmontar el componente
        return () => {
            window.removeEventListener('click', handleClick);
            clearTimeout(timeout);
        };
    }, [navigate]);

    const { deviceType } = useScreenSize();

    const styles = {
        mobile: {
            container: "flex items-center justify-center h-screen relative",
            logo: "absolute top-[28%] w-[35vw] h-[9vh] bg-dark",
            thanks: "absolute font-now leading-[80%] top-[50%] transform text-[8vw] tracking-[1.5vw] text-gray-500",
            cupon: "absolute font-now leading-[95%] top-[65%] transform text-[6vw] tracking-[1.5vw] text-gray-500"
        },
        tablet: {
            container: "flex items-center justify-center h-screen relative",
            logo: "absolute top-[28%] w-[35vw] h-[11vh] bg-dark",
            thanks: "absolute font-now leading-[80%] top-[50%] transform text-[8vw] tracking-[1.5vw] text-gray-500",
            cupon: "absolute font-now leading-[95%] top-[65%] transform text-[6vw] tracking-[1.5vw] text-gray-500"
        },
        desktop: {
            container: "flex items-center justify-center h-screen relative",
            logo: "absolute top-[8%] w-[15vw] h-[14vh] bg-dark",
            thanks: "absolute font-now leading-[80%] top-[50%] transform text-[6vw] tracking-[1.5vw] text-gray-500",
            cupon: "absolute font-now leading-[95%] top-[65%] transform text-[6vw] tracking-[1.5vw] text-gray-500"
        }
    };

    const deviceStyles = styles[deviceType];

    return (
        <div className={deviceStyles.container}>
            <img className={deviceStyles.logo} src="/Logo.webp" alt="Muy Mala" />
            <a className={deviceStyles.thanks}>
                ¡MUCHAS GRACIAS!
            </a>
            {/*<a className="absolute font-now leading-[95%] top-[65%] transform text-[60px] tracking-[15px] text-gray-500">
                TE ENVIAMOS UN CUP&Oacute;N
            </a>*/}
        </div>
    );
};
