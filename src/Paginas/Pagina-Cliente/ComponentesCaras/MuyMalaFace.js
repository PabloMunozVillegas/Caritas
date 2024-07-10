import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MuyMalaFace = () => {
  const faceRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const leftLensRef = useRef();
  const rightLensRef = useRef();
  const bridgeRef = useRef();
  const tearsLeftRef = useRef();
  const tearsRightRef = useRef();
  const leftEyebrowRef = useRef();
  const rightEyebrowRef = useRef();

  const [tearsVisible, setTearsVisible] = useState(false);
  const [eyesClosed, setEyesClosed] = useState(false);
  const [tearProgress, setTearProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (isAnimating) {
      // Animación de parpadeo de los ojos
      if (eyesClosed) {
        leftEyeRef.current.scale.y = 0.1;
        rightEyeRef.current.scale.y = 0.1;
      } else {
        const blinkCycle = Math.sin(t * 4) * 0.5 + 0.5;
        const eyeBlinkAmount = blinkCycle * 0.1;
        leftEyeRef.current.scale.y = 1 - eyeBlinkAmount;
        rightEyeRef.current.scale.y = 1 - eyeBlinkAmount;
      }

      // Animación de lágrimas
      if (tearsVisible) {
        const growthSpeed = 0.5;
        const newProgress = Math.min(1, tearProgress + growthSpeed * delta);
        setTearProgress(newProgress);

        // Ajustar la posición y la escala para animar hacia abajo
        tearsLeftRef.current.position.y = 0.05 + (1 - newProgress) * 0.5; // Ajusta la posición Y hacia abajo
        tearsRightRef.current.position.y = 0.05 + (1 - newProgress) * 0.5; // Ajusta la posición Y hacia abajo
        tearsLeftRef.current.scale.y = newProgress;
        tearsRightRef.current.scale.y = newProgress;
        tearsLeftRef.current.visible = true;
        tearsRightRef.current.visible = true;

        if (newProgress >= 1) {
          setTimeout(() => {
            setTearsVisible(false);
            setEyesClosed(false);
          }, 1000);
        }
      } else {
        tearsLeftRef.current.visible = false;
        tearsRightRef.current.visible = false;
      }
    }
  });

  const handleClick = () => {
    setIsAnimating(true);
    setTearsVisible(true);
    setEyesClosed(true);
    setTearProgress(0);
  };

  const lightBlue = useMemo(() => new THREE.Color('#4FC3F7'), []);

  return (
    <group ref={faceRef} onClick={handleClick} scale={[1.2, 1.2, 1.2]}>
      {/* Cara principal */}
      <mesh>
        <circleGeometry args={[1.5, 32]} />
        <meshStandardMaterial color={lightBlue} />
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

        {/* Cejas */}
        <group position={[0, 0,1, 0.2]}>
          {/* Ceja izquierda */}
          <mesh ref={leftEyebrowRef} position={[-0.35, 0.25, 0.2]} rotation={[0, 0, 0]}>
            <planeGeometry args={[0.25, 0.05]} />
            <meshBasicMaterial color="black" />
          </mesh>
          {/* Ceja derecha */}
          <mesh ref={rightEyebrowRef} position={[0.35, 0.25, 0.2]} rotation={[0, 0, 0]}>
            <planeGeometry args={[0.25, 0.05]} />
            <meshBasicMaterial color="black" />
          </mesh>
        </group>
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
        <group ref={bridgeRef} position={[0, 0, -0.01]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.3, 0.03, 0.02]} />
            <meshBasicMaterial color="black" />
          </mesh>
        </group>
      </group>

      {/* Sonrisa al revés */}
      <group position={[0, -0.6, 0.2]}>
        <mesh rotation={[Math.PI / 1, 0, 0]}>
          <circleGeometry args={[0.5, 32, Math.PI, Math.PI]} />
          <meshBasicMaterial color="black" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Lágrimas */}
      <group position={[0, -0.25, 0.1]}>
        {/* Lágrima izquierda */}
        <mesh ref={tearsLeftRef} position={[-0.44, 0.05 - 0.5, 0.1]} scale={[1, 0, 1]}> {/* Ajusta la posición inicial y la escala */}
          <planeGeometry args={[0.1, 1]} />
          <meshBasicMaterial color="blue" transparent opacity={0.7} />
        </mesh>
        {/* Lágrima derecha */}
        <mesh ref={tearsRightRef} position={[0.44, 0.05 - 0.5, 0.1]} scale={[1, 0, 1]}> {/* Ajusta la posición inicial y la escala */}
          <planeGeometry args={[0.1, 1]} />
          <meshBasicMaterial color="blue" transparent opacity={0.7} />
        </mesh>
      </group>
    </group>
  );
};

const MuyMalaAnimatedFace = () => (
  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
    <ambientLight intensity={0.5} />
    <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} />
    <pointLight position={[10, 10, 10]} />
    <MuyMalaFace />
  </Canvas>
);

export default MuyMalaAnimatedFace;