import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
      
      const targetX = (state.mouse.x * Math.PI) / 12;
      const targetY = (state.mouse.y * Math.PI) / 12;
      
      meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.4}>
        <MeshDistortMaterial
          color="#ff006e"
          attach="material"
          distort={0.4}
          speed={2.5}
          roughness={0.15}
          metalness={0.85}
        />
      </Sphere>
    </Float>
  );
};

const ThreeDSection: React.FC = () => {
  return (
    <section className="h-screen bg-[#0a0a0a] relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-[#0a0a0a]" />}>
          <Canvas 
            dpr={[1, 2]} 
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ 
              antialias: true, 
              alpha: true,
              powerPreference: "high-performance" 
            }}
            onCreated={({ gl }) => {
              gl.setClearColor(new THREE.Color('#0a0a0a'), 0);
            }}
            onError={(e) => console.error("Three.js Canvas Error:", e)}
          >
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f5ff" />
            <spotLight position={[-10, 10, 5]} intensity={1} color="#ff006e" angle={0.2} penumbra={1} />
            <AnimatedShape />
          </Canvas>
        </Suspense>
      </div>
      
      <div className="z-10 text-center pointer-events-none max-w-2xl px-6">
        <h2 className="text-6xl md:text-8xl font-black uppercase mb-6 drop-shadow-2xl text-white">
            Fluid <span className="text-[#ff006e]">Realities</span>
        </h2>
        <p className="text-xl text-gray-400 font-light leading-relaxed">
            Harnessing WebGL to create organic, reactive geometries that transform user interaction into a visual symphony. 
            Every movement calculated, every frame a masterpiece.
        </p>
      </div>
    </section>
  );
};

export default ThreeDSection;