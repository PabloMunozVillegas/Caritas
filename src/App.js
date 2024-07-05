import React, { useState } from 'react';
import GreenFace from './Faces3D/ExcelenteFace';
import BlueFace from './Faces3D/MuyMalaFace';
import CalificacionApiPostFunction from './Functions/ApiPostFuncition';

function App() {
  const [calificacionEnviada, setCalificacionEnviada] = useState(null); // Estado para almacenar la calificación enviada

  const handleClick = async (calificacion) => {
    try {
      console.log(calificacion)
      await CalificacionApiPostFunction({ nombre: calificacion, sucursal: 'string'  });
      setCalificacionEnviada(calificacion); // Actualiza el estado después de enviar la calificación
    } catch (error) {
      console.error('Error al enviar la calificación a la API:', error);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div onClick={() => handleClick('Excelente')}>
        <GreenFace />
      </div>
      <div onClick={() => handleClick('MuyMala')}>
        <BlueFace />
      </div>
      {calificacionEnviada && (
        <p>Calificación enviada: {calificacionEnviada}</p>
      )}
    </div>
  );
}

export default App;
