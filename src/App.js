import React from 'react';
import GreenFace from './Faces3D/ExcelenteFace';
import BlueFace from './Faces3D/MalaFace';

function App() {
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div onClick={() => alert('Carita Feliz')}>
        <GreenFace/>
      </div>
      <div onClick={() => alert('Carita Triste')}>
        <BlueFace />
      </div>
    </div>
  );
}

export default App;
