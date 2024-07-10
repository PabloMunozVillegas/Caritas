import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MuyBuenaFace = () => {
  const faceRef = useRef();
  const leftLensRef = useRef();
  const rightLensRef = useRef();
  const bridgeRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const smileRef = useRef();
  const leftEyebrowRef = useRef();
  const rightEyebrowRef = useRef();
  const [isAnimating, setIsAnimating] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (isAnimating) {
      // Animación sutil de subida y bajada
      faceRef.current.position.y = Math.sin(t * 2) * 0.1;

      // Animación de los lentes y el puente
      const liftCycle = Math.sin(t * 2) * 0.5 + 0.5;
      const liftAmount = liftCycle * 0.2;

      leftLensRef.current.position.y = liftAmount;
      rightLensRef.current.position.y = liftAmount;
      bridgeRef.current.position.y = liftAmount;

      // Animación de parpadeo de ojos
      const blinkSpeed = t * 2;
      leftEyeRef.current.scale.y = Math.max(Math.cos(blinkSpeed), 0.1);
      rightEyeRef.current.scale.y = Math.max(Math.cos(blinkSpeed), 0.1);

      // Animación de la sonrisa que se cierra y vuelve a sonreír
      const smileSpeed = t * 1;
      const smileScale = Math.abs(Math.sin(smileSpeed)) * 0.5 + 0.5;
      smileRef.current.scale.set(1, smileScale, 1);

      // Animación de cejas
      const eyebrowLift = Math.sin(t * 2) * 0.05 + 0.1;
      leftEyebrowRef.current.position.y = eyebrowLift + 0.55;
      rightEyebrowRef.current.position.y = eyebrowLift + 0.55;
      leftEyebrowRef.current.position.x = -0.35 + Math.sin(t * 2) * 0.05;
      rightEyebrowRef.current.position.x = 0.35 - Math.sin(t * 2) * 0.05;
    }
  });

  const handleClick = () => {
    setIsAnimating(true);
  };

  const lightGreen = useMemo(() => new THREE.Color('#00ff40'), []);

  return (
    <group ref={faceRef} onClick={handleClick} scale={[1.2, 1.2, 1.2]}>
      {/* Cara principal */}
      <mesh>
        <circleGeometry args={[1.5, 32]} />
        <meshStandardMaterial color={lightGreen} />
      </mesh>

      {/* Ojos */}
      <group position={[0, 0.3, 0.2]}>
        {/* Ojo izquierdo */}
        <mesh ref={leftEyeRef} position={[-0.40, 0, 0.5]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
        {/* Ojo derecho */}
        <mesh ref={rightEyeRef} position={[0.40, 0, 0.5]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
      </group>

      {/* Lentes */}
      <group position={[0, 0.3, 0.15]}>
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
        <mesh ref={leftEyebrowRef} position={[-0.40, 0.55, 0.5]}>
          <boxGeometry args={[0.25, 0.05, 0.05]} />
          <meshBasicMaterial color="black" />
        </mesh>
        {/* Ceja derecha */}
        <mesh ref={rightEyebrowRef} position={[0.40, 0.55, 0.5]}>
          <boxGeometry args={[0.25, 0.05, 0.05]} />
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

const MuyBuenaAnimatedFace = () => (
  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
    <ambientLight intensity={0.5} />
    <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} />
    <pointLight position={[10, 10, 10]} />
    <MuyBuenaFace/>
  </Canvas>
);

export default MuyBuenaAnimatedFace;