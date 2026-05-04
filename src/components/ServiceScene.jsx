import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Environment, Float, PresentationControls } from '@react-three/drei';

const Scissors = () => {
  const group = useRef();
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={group} dispose={null} scale={1.5}>
      {/* Blade 1 */}
      <mesh position={[-0.2, 0.5, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.1, 1.2, 0.05]} />
        <meshStandardMaterial color="#b0b0b0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Blade 2 */}
      <mesh position={[0.2, 0.5, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.1, 1.2, 0.05]} />
        <meshStandardMaterial color="#b0b0b0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Handle 1 */}
      <mesh position={[-0.4, -0.5, 0]}>
        <torusGeometry args={[0.2, 0.06, 8, 16]} />
        <meshStandardMaterial color="#222" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Handle 2 */}
      <mesh position={[0.4, -0.5, 0]}>
        <torusGeometry args={[0.2, 0.06, 8, 16]} />
        <meshStandardMaterial color="#222" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Pivot */}
      <mesh position={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

const Trimmer = () => {
  return (
    <group scale={1.5}>
      {/* Body */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.2, 0.15, 1.2, 16]} />
        <meshStandardMaterial color="#222" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.5, 0.2, 0.2]} />
        <meshStandardMaterial color="#b0b0b0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Blade detail */}
      <mesh position={[0, 0.65, 0.05]}>
        <boxGeometry args={[0.4, 0.1, 0.05]} />
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

const Comb = () => {
  return (
    <group scale={1.5} rotation={[0, 0, Math.PI / 4]}>
      {/* Spine */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.2, 2, 0.05]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Teeth */}
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh key={i} position={[0.2, -0.9 + i * 0.13, 0]}>
          <boxGeometry args={[0.3, 0.05, 0.05]} />
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
};

const ServiceScene = ({ activeTool }) => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]} // Performance: limit pixel ratio
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="studio" />
      
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Center>
            {activeTool === 'scissors' && <Scissors />}
            {activeTool === 'trimmer' && <Trimmer />}
            {activeTool === 'comb' && <Comb />}
          </Center>
        </Float>
      </PresentationControls>
    </Canvas>
  );
};

export default ServiceScene;
