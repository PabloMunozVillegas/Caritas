import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MuyMalaFace = () => {
  const faceRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const leftEyebrowRef = useRef();
  const rightEyebrowRef = useRef();
  const leftLensRef = useRef();
  const rightLensRef = useRef();
  const bridgeRef = useRef();

  const [isAnimating, setIsAnimating] = useState(true);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    
    if (isAnimating) {
      // Animación de salto
      faceRef.current.position.y = Math.abs(Math.sin(t * 2)) * 0.1;

      // Animación de los lentes y el puente
      const liftCycle = Math.sin(t * 2) * 0.5 + 0.5;
      const liftAmount = liftCycle * 0.2;

      leftLensRef.current.position.y = liftAmount;
      rightLensRef.current.position.y = liftAmount;
      bridgeRef.current.position.y = liftAmount;


      // Animación de cejas enojadas
      const eyebrowAngle = Math.sin(t * 4) * 0.3 + 0.4; // Oscila entre -0.4 y 0 radianes
      leftEyebrowRef.current.rotation.z = -eyebrowAngle;
      rightEyebrowRef.current.rotation.z = eyebrowAngle;

      // Animación sutil de los ojos
      const eyeSquint = Math.sin(t * 4) * 0.1 + 0.9; // Oscila entre 0.8 y 1
      leftEyeRef.current.scale.y = eyeSquint;
      rightEyeRef.current.scale.y = eyeSquint;
    }
  });

  const handleClick = () => {
    setIsAnimating(false);
  };

  const lightred = useMemo(() => new THREE.Color('#DE1103'), []);

  return (
    <group ref={faceRef} onClick={handleClick} scale={[1.2, 1.2, 1.2]}>
      {/* Cara principal */}
      <mesh>
        <circleGeometry args={[1.5, 32]} />
        <meshStandardMaterial color={lightred} />
      </mesh>

      {/* Ojos */}
      <group position={[0, 0.3, 0.2]}>
        {/* Ojo izquierdo */}
        <mesh ref={leftEyeRef} position={[-0.40, 0, 0.5]} scale={[1, 1, 1]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
        {/* Ojo derecho */}
        <mesh ref={rightEyeRef} position={[0.40, 0, 0.5]} scale={[1, 1, 1]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>

         {/* Lentes */}
      <group position={[0, 0.0, 0.15]}>
        {/* Lente izquierdo */}
        <group ref={leftLensRef} position={[-0.50, 0, 0]}>
          <mesh>
            <circleGeometry args={[0.35, 32]} />
            <meshPhongMaterial color="white" transparent opacity={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <ringGeometry args={[0.33, 0.35, 32]} />
            <meshBasicMaterial color="black" side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Lente derecho */}
        <group ref={rightLensRef} position={[0.50, 0, 0]}>
          <mesh>
            <circleGeometry args={[0.35, 32]} />
            <meshPhongMaterial color="white" transparent opacity={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <ringGeometry args={[0.33, 0.35, 32]} />
            <meshBasicMaterial color="black" side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Puente de los lentes */}
        <group ref={bridgeRef} position={[0, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.3, 0.03, 0.02]} />
            <meshBasicMaterial color="black" />
          </mesh>
        </group>
      </group>

        {/* Cejas */}
        <group position={[0, 0.1, 0.2]}>
          {/* Ceja izquierda */}
          <mesh ref={leftEyebrowRef} position={[-0.35, 0.25, 0.5]} rotation={[0, 0, -0.2]}>
            <planeGeometry args={[0.25, 0.05]} />
            <meshBasicMaterial color="black" />
          </mesh>
          {/* Ceja derecha */}
          <mesh ref={rightEyebrowRef} position={[0.35, 0.25, 0.5]} rotation={[0, 0, 0.2]}>
            <planeGeometry args={[0.25, 0.05]} />
            <meshBasicMaterial color="black" />
          </mesh>
        </group>
      </group>

      {/* Boca enojada */}
      <group position={[0, -0.5, 0.2]}>
        <mesh>
          <planeGeometry args={[0.6, 0.1]} />
          <meshBasicMaterial color="black" />
        </mesh>
      </group>
    </group>
  );
};

const MuyMalaAnimatedFace = () => (
  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
    <ambientLight intensity={2} />
    <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} />
    <pointLight position={[10, 10, 10]} />
    <MuyMalaFace />
  </Canvas>
);

export default MuyMalaAnimatedFace;