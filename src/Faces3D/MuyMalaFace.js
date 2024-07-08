import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MuyMalaFace = () => {
  const faceRef = useRef();
  const smileRef = useRef();
  const leftTearRef = useRef();
  const rightTearRef = useRef();

  useFrame((state) => {
    faceRef.current.rotation.y += 0.01;
    
    const t = state.clock.getElapsedTime();
    // Animación sutil de la boca
    smileRef.current.scale.y = 1 + Math.sin(t * 1.5) * 0.05;
    
    // Animación de las lágrimas
    leftTearRef.current.position.y = -0.3 - (Math.sin(t * 2) * 0.1);
    rightTearRef.current.position.y = -0.3 - (Math.sin(t * 2 + 1) * 0.1);
  });

  // Color azul claro
  const lightBlue = useMemo(() => new THREE.Color('#ADD8E6'), []);

  return (
    <group ref={faceRef}>
      {/* Cara principal */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial color={lightBlue} />
      </mesh>

      {/* Ojos */}
      <mesh position={[-0.3, 0.3, 0.9]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial color="black" />
      </mesh>
      <mesh position={[0.3, 0.3, 0.9]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial color="black" />
      </mesh>

      {/* Boca (línea recta con ligera animación) */}
      <mesh ref={smileRef} position={[0, -0.2, 0.9]}>
        <boxGeometry args={[0.5, 0.05, 0.1]} />
        <meshBasicMaterial color="black" />
      </mesh>

      {/* Lágrimas */}
      <mesh ref={leftTearRef} position={[-0.3, -0.3, 0.9]}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshBasicMaterial color="skyblue" transparent opacity={0.7} />
      </mesh>
      <mesh ref={rightTearRef} position={[0.3, -0.3, 0.9]}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshBasicMaterial color="skyblue" transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

const AnimatedFace = () => (
  <Canvas>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} />
    <MuyMalaFace />
  </Canvas>
);

export default AnimatedFace;