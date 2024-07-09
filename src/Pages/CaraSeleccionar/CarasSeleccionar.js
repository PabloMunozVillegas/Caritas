import React, { useState } from 'react';
import './CarasSeleccionar.css'; 
import ExcelenteAnimatedFace from '../Faces3D/ExcelenteFace';
import RegularAnimatedFace from '../Faces3D/RegularFace';
import MuyBuenaAnimatedFace from '../Faces3D/MuyBuenaFace';
import MalaAnimatedFace from '../Faces3D/MalaFace';
import MuyMalaAnimatedFace from '../Faces3D/MuyMalaFace';

import CalificacionApiPostFunction from '../Functions/ApiPostFuncition';

function CarasSeleccionar() {
  const [calificacionEnviada, setCalificacionEnviada] = useState(null);

  const handleClick = async (calificacion) => {
    try {
      console.log(calificacion);
      await CalificacionApiPostFunction({ nombre: calificacion, sucursal: 'string' });
      setCalificacionEnviada(calificacion); 
    } catch (error) {
      console.error('Error al enviar la calificación a la API:', error);
    }
  };

  return (
    <div className="app-container">
      <div className="animated-face-container">
        <div className="animated-face" id="cara5" onClick={() => handleClick('Excelente')}>
          <ExcelenteAnimatedFace />
        </div>
        <div className="animated-face" id="cara4" onClick={() => handleClick('Bueno')}>
          <MuyBuenaAnimatedFace />
        </div>
        <div className="animated-face" id="cara3" onClick={() => handleClick('Regular')}>
          <RegularAnimatedFace />
        </div>
        <div className="animated-face" id="cara2" onClick={() => handleClick('Mala')}>
          <MalaAnimatedFace />
        </div>
        <div className="animated-face" id="cara1" onClick={() => handleClick('MuyMala')}>
          <MuyMalaAnimatedFace />
        </div>
      </div>
      {calificacionEnviada && (
        <p className="calificacion-enviada">Calificación enviada: {calificacionEnviada}</p>
      )}
    </div>
  );
}

export default CarasSeleccionar;