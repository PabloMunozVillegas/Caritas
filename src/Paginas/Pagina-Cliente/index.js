import React, { useState } from 'react';
import './index.css';
import ExcelenteAnimatedFace from './ComponentesCaras/ExcelenteFace';
import RegularAnimatedFace from './ComponentesCaras/RegularFace';
import MuyBuenaAnimatedFace from './ComponentesCaras/MuyBuenaFace';
import MalaAnimatedFace from './ComponentesCaras/MalaFace';
import MuyMalaAnimatedFace from './ComponentesCaras/MuyMalaFace';
import { APIFunctions } from '../../Funciones/FuncionesApi';

function CarasSeleccionar() {
  const [calificacionEnviada, setCalificacionEnviada] = useState(null);
  const [faceSelected, setFaceSelected] = useState(null);

  const handleClick = async (calificacion) => {
    try {
      const token = localStorage.getItem('token');
      await APIFunctions.calificacion.create({ nombre: calificacion, sucursal: 'string' }, token);
      setFaceSelected(calificacion);
      setCalificacionEnviada(calificacion);

      setTimeout(() => {
        setFaceSelected(null); // Quitar la cara seleccionada después de 3 segundos
        setCalificacionEnviada(null); // Mostrar todas las caras después de 3 segundos
      }, 3000);
    } catch (error) {
      console.error('Error al enviar la calificación a la API:', error);
    }
  };

  const handleContainerClick = (calificacion) => {
    handleClick(calificacion);
  };

  const renderFace = (calificacion) => {
    switch (calificacion) {
      case 'Excelente':
        return { face: <ExcelenteAnimatedFace />, message: '¡Excelente! Gracias por tu calificación.' };
      case 'Bueno':
        return { face: <MuyBuenaAnimatedFace />, message: '¡Muy bueno! Gracias por tu calificación.' };
      case 'Regular':
        return { face: <RegularAnimatedFace />, message: 'Regular, trabajaremos para mejorar.' };
      case 'Mala':
        return { face: <MalaAnimatedFace />, message: 'Lo sentimos, mejoraremos para ti.' };
      case 'MuyMala':
        return { face: <MuyMalaAnimatedFace />, message: 'Lamentamos tu experiencia, mejoraremos.' };
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <div className="animated-face-container">
        {!faceSelected && (
          <>
            <div className="animated-face" onClick={() => handleContainerClick('Excelente')}>
              {renderFace('Excelente').face}
            </div>
            <div className="animated-face" onClick={() => handleContainerClick('Bueno')}>
              {renderFace('Bueno').face}
            </div>
            <div className="animated-face" onClick={() => handleContainerClick('Regular')}>
              {renderFace('Regular').face}
            </div>
            <div className="animated-face" onClick={() => handleContainerClick('Mala')}>
              {renderFace('Mala').face}
            </div>
            <div className="animated-face" onClick={() => handleContainerClick('MuyMala')}>
              {renderFace('MuyMala').face}
            </div>
          </>
        )}

        {faceSelected && (
          <div className={`selected-face ${faceSelected}`}>
            <div className="animated-face">
              {renderFace(faceSelected).face}
            </div>
          </div>
        )}
      </div>

      {calificacionEnviada && (
        <div className="calificacion-enviada">
          <p>{renderFace(calificacionEnviada).message}</p>
        </div>
      )}
    </div>
  );
}

export default CarasSeleccionar;
