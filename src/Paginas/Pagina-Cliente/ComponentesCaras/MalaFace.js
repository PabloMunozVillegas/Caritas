import React, { useRef, useMemo } from 'react';
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
  const bridgeRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Animación de salto
    faceRef.current.position.y = Math.abs(Math.sin(t * 2)) * 0.1;

    // Animación de los lentes y el puente
    const liftCycle = Math.sin(t * 2) * 0.5 + 0.5;
    const liftAmount = liftCycle * 0.2;

    leftLensRef.current.position.y = liftAmount;
    rightLensRef.current.position.y = liftAmount;
    bridgeRef.current.position.y = liftAmount;

    // Animación de parpadeo de los ojos
    const blinkCycle = Math.sin(t * 4) * 0.5 + 0.5;
    const eyeBlinkAmount = blinkCycle * 0.1;
    leftEyeRef.current.scale.y = 1 - eyeBlinkAmount;
    rightEyeRef.current.scale.y = 1 - eyeBlinkAmount;

    // Animación de la sonrisa al revés (mueca)
    const reverseSmileCycle = Math.sin(t * 2);
    reverseSmileRef.current.rotation.x = reverseSmileCycle * 0.4;

    // Animación de cejas inclinadas hacia el centro
    const eyebrowIncline = Math.abs(reverseSmileCycle) * 40;
    leftEyebrowRef.current.rotation.z = THREE.MathUtils.degToRad(eyebrowIncline);
    rightEyebrowRef.current.rotation.z = THREE.MathUtils.degToRad(-eyebrowIncline);
  });

  const lightorange = useMemo(() => new THREE.Color('#F39C12'), []);

  return (
    <group ref={faceRef} scale={[1.2, 1.2, 1.2]}>
      {/* Cara principal */}
      <mesh>
        <circleGeometry args={[1.5, 32]} />
        <meshStandardMaterial color={lightorange} />
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
        <group position={[0, 0.1, 0.2]}>
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

      {/* Sonrisa al revés (mueca) */}
      <group position={[0, -0.6, 0.2]} ref={reverseSmileRef}>
        <mesh rotation={[Math.PI, 0, 0]}>
          <circleGeometry args={[0.5, 32, Math.PI, Math.PI]} />
          <meshBasicMaterial color="black" side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
};

const MalaAnimatedFace = () => (
  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
    <ambientLight intensity={1.8} />
    <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} />
    <pointLight position={[10, 10, 10]} />
    <MalaFace />
  </Canvas>
);

export default MalaAnimatedFace;