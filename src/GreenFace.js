import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GreenFace = () => {
  const faceRef = useRef();
  const smileRef = useRef();

  useFrame((state) => {
    // Animación de salto
    const t = state.clock.getElapsedTime();
    faceRef.current.position.y = Math.abs(Math.sin(t * 3)) * 0.2; // Efecto de salto

    // Animación de la sonrisa más rápida y en diferentes direcciones
    smileRef.current.position.x = Math.sin(t * 5) * 0.05;
    smileRef.current.position.y = -0.2 + Math.cos(t * 5) * 0.05;
    smileRef.current.scale.y = 1 + Math.sin(t * 5) * 0.2;
  });

  // Color verde más oscuro para que coincida con la imagen
  const darkGreen = useMemo(() => new THREE.Color('#2e8b57'), []);

  return (
    <group ref={faceRef}>
      {/* Cara principal */}
      <mesh>
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial color={darkGreen} />
      </mesh>

      {/* Lentes */}
      <group position={[0, 0.2, 0.15]}>
        {/* Lente izquierdo */}
        <mesh position={[-0.35, 0, 0]}>
          <circleGeometry args={[0.25, 32]} />
          <meshPhongMaterial color="white" transparent opacity={0.3} />
        </mesh>
        <mesh position={[-0.35, 0, 0.01]}>
          <ringGeometry args={[0.23, 0.25, 32]} />
          <meshBasicMaterial color="black" side={THREE.DoubleSide} />
        </mesh>

        {/* Lente derecho */}
        <mesh position={[0.35, 0, 0]}>
          <circleGeometry args={[0.25, 32]} />
          <meshPhongMaterial color="white" transparent opacity={0.3} />
        </mesh>
        <mesh position={[0.35, 0, 0.01]}>
          <ringGeometry args={[0.23, 0.25, 32]} />
          <meshBasicMaterial color="black" side={THREE.DoubleSide} />
        </mesh>

        {/* Puente de los lentes */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.4, 0.03, 0.02]} />
          <meshBasicMaterial color="black" />
        </mesh>
      </group>

      {/* Sonrisa */}
      <group ref={smileRef} position={[0, -0.2, 0.1]}>
        <mesh>
          <circleGeometry args={[0.5, 32, Math.PI, Math.PI]} />
          <meshBasicMaterial color="black" side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
};

const AnimatedFace = () => (
  <Canvas>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} />
    <GreenFace />
  </Canvas>
);

export default AnimatedFace;