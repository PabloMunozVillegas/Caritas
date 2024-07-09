import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MalaFace = () => {
    const faceRef = useRef();
    const leftEyeRef = useRef();
    const rightEyeRef = useRef();
    const leftLensRef = useRef();
    const rightLensRef = useRef();
    const reverseSmileRef = useRef();
    const leftEyebrowRef = useRef();
    const rightEyebrowRef = useRef();
    const bridgeRef = useRef(); // Agregado el ref para el puente entre los lentes
  
    const [eyesClosed, setEyesClosed] = useState(false);
    const [eyebrowProgress, setEyebrowProgress] = useState(0);
  
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
  
      // Animación de la sonrisa al revés (mueca)
      const reverseSmileCycle = Math.sin(t * 2);
      reverseSmileRef.current.rotation.x = reverseSmileCycle * 0.3; // Ajusta el ángulo de rotación según el ciclo sinusoidal
  
      // Animación de cejas inclinadas hacia el centro
      const eyebrowIncline = Math.abs(reverseSmileCycle) * 45;
      leftEyebrowRef.current.rotation.z = THREE.MathUtils.degToRad(eyebrowIncline);
      rightEyebrowRef.current.rotation.z = THREE.MathUtils.degToRad(-eyebrowIncline);
    });
  
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
  
          {/* Cejas */}
          <group position={[0, -0.14, 0.4]}>
            {/* Ceja izquierda */}
            <mesh ref={leftEyebrowRef} position={[-0.35, 0.25, 0.2]} rotation={[0, 0, 0]}>
              <planeGeometry args={[0.2, 0.05]} />
              <meshBasicMaterial color="black" />
            </mesh>
            {/* Ceja derecha */}
            <mesh ref={rightEyebrowRef} position={[0.35, 0.25, 0.2]} rotation={[0, 0, 0]}>
              <planeGeometry args={[0.2, 0.05]} />
              <meshBasicMaterial color="black" />
            </mesh>
          </group>
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
          <group ref={bridgeRef} position={[0, 0, -0.01]}>
            <mesh>
              <boxGeometry args={[0.4, 0.03, 0.02]} />
              <meshBasicMaterial color="black" />
            </mesh>
          </group>
        </group>
  
        {/* Sonrisa al revés (mueca) */}
        <group position={[0, -0.3, 0.2]} ref={reverseSmileRef}>
          <mesh rotation={[Math.PI/1, 0, 0]}>
            <circleGeometry args={[0.2, 32, Math.PI/1, Math.PI]} />
            <meshBasicMaterial color="black" side={THREE.DoubleSide} />
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
