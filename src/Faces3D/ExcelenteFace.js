import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ExcelenteFace = () => {
  const faceRef = useRef();
  const leftLensRef = useRef();
  const rightLensRef = useRef();
  const bridgeRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Animación de salto
    faceRef.current.position.y = Math.abs(Math.sin(t * 3)) * 0.2;

    // Animación de los lentes y el puente
    const liftCycle = Math.sin(t * 2) * 0.5 + 0.5; // Va de 0 a 1 y de vuelta a 0 cada π segundos
    const liftAmount = liftCycle * 0.5; // Ajusta la distancia de elevación de los lentes y el puente

    leftLensRef.current.position.y = liftAmount;
    rightLensRef.current.position.y = liftAmount;
    bridgeRef.current.position.y = liftAmount;
  });

  const lightGreen = useMemo(() => new THREE.Color('#00C040'), []);

  return (
    <group ref={faceRef}>
      {/* Cara principal */}
      <mesh>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial color={lightGreen} />
      </mesh>

      {/* Ojos */}
      <group position={[0, 0.2, 0.2]}>
        {/* Ojo izquierdo */}
        <mesh position={[-0.35, 0, 0.1]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
        {/* Ojo derecho */}
        <mesh position={[0.35, 0, 0.1]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
      </group>

      {/* Lentes */}
      <group position={[0, 0.2, 0.15]}>
        {/* Lente izquierdo */}
        <group ref={leftLensRef} position={[-0.35, 0, 0]}>
          <mesh>
            <circleGeometry args={[0.25, 32]} />
            <meshPhongMaterial color="white" transparent opacity={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <ringGeometry args={[0.23, 0.25, 32]} />
            <meshBasicMaterial color="black" side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Lente derecho */}
        <group ref={rightLensRef} position={[0.35, 0, 0]}>
          <mesh>
            <circleGeometry args={[0.25, 32]} />
            <meshPhongMaterial color="white" transparent opacity={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <ringGeometry args={[0.23, 0.25, 32]} />
            <meshBasicMaterial color="black" side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Puente de los lentes */}
        <group ref={bridgeRef} position={[0, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.4, 0.03, 0.02]} />
            <meshBasicMaterial color="black" />
          </mesh>
        </group>
      </group>

      {/* Sonrisa */}
      <group position={[0, -0.2, 0.1]}>
        <mesh>
          <circleGeometry args={[0.5, 32, Math.PI, Math.PI]} />
          <meshBasicMaterial color="black" side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
};

const AnimatedFace = () => (
  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
    <ambientLight intensity={0.5} />
    <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} />
    <pointLight position={[10, 10, 10]} />
    <ExcelenteFace />
  </Canvas>
);

export default AnimatedFace;