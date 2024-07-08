import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MalaFace = () => {
  const faceRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const leftLensRef = useRef();
  const rightLensRef = useRef();
  const bridgeRef = useRef();
  const tearsLeftRef = useRef();
  const tearsRightRef = useRef();

  const [tearsVisible, setTearsVisible] = useState(false);
  const [eyesClosed, setEyesClosed] = useState(false);
  const [tearProgress, setTearProgress] = useState(0);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

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


  });

  useEffect(() => {
    const tearInterval = setInterval(() => {
      setTearsVisible(true);
      setEyesClosed(true);
      setTearProgress(0);
    }, 5000);

    return () => clearInterval(tearInterval);
  }, []);

  const lightBlue = useMemo(() => new THREE.Color('#4FC3F7'), []);

  return (
    <group ref={faceRef}>
      {/* Cara principal */}
      <mesh>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial color={lightBlue} />
      </mesh>

      {/* Ojos */}
      <group position={[0, 0.2, 0.2]}>
        {/* Ojo izquierdo */}
        <mesh ref={leftEyeRef} position={[-0.35, 0, 0.1]} scale={[1, 1, 1]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
        {/* Ojo derecho */}
        <mesh ref={rightEyeRef} position={[0.35, 0, 0.1]} scale={[1, 1, 1]}>
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

      {/* Sonrisa al revés */}
      <group position={[0, -0.3, 0.2]}>
        <mesh rotation={[Math.PI/1, 0, 0]}>
          <circleGeometry args={[0.2, 32, Math.PI, Math.PI]} />
          <meshBasicMaterial color="black" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Lágrimas */}
      <group position={[0, -0.35, 0.1]}>
        {/* Lágrima izquierda */}
        <mesh ref={tearsLeftRef} position={[-0.35, 0.05 - 0.5, 0.1]} scale={[1, 0, 1]}> {/* Ajusta la posición inicial y la escala */}
          <planeGeometry args={[0.1, 1]} />
          <meshBasicMaterial color="blue" transparent opacity={0.7} />
        </mesh>
        {/* Lágrima derecha */}
        <mesh ref={tearsRightRef} position={[0.35, 0.05 - 0.5, 0.1]} scale={[1, 0, 1]}> {/* Ajusta la posición inicial y la escala */}
          <planeGeometry args={[0.1, 1]} />
          <meshBasicMaterial color="blue" transparent opacity={0.7} />
        </mesh>
      </group>

    </group>
  );
};

const MalaAnimatedFace = () => (
  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
    <ambientLight intensity={0.5} />
    <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} />
    <pointLight position={[10, 10, 10]} />
    <MalaFace />
  </Canvas>
);

export default MalaAnimatedFace;
