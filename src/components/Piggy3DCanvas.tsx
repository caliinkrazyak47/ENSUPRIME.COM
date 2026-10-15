import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

function InteractiveCan({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    // Smooth magnetic mouse follow with real mass
    const targetX = mouse.current.x * 0.45;
    const targetY = mouse.current.y * 0.35;
    meshRef.current.rotation.y += delta * 0.8;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY * 0.5, 0.05);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, -targetX * 0.4, 0.05);
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX * 0.3, 0.05);
  });

  return (
    <Float speed={2.4} rotationIntensity={0.6} floatIntensity={0.8}>
      <group ref={meshRef} position={[0, -0.1, 0]}>
        {/* Main Can Body */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.05, 1.05, 3.2, 48]} />
          <meshStandardMaterial
            color="#181a20"
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>

        {/* Can Top Rim Metal */}
        <mesh position={[0, 1.62, 0]}>
          <cylinderGeometry args={[0.95, 1.05, 0.12, 48]} />
          <meshStandardMaterial color="#33e4b8" metalness={0.85} roughness={0.15} />
        </mesh>

        {/* Can Top Lid */}
        <mesh position={[0, 1.68, 0]}>
          <cylinderGeometry args={[0.92, 0.92, 0.04, 48]} />
          <meshStandardMaterial color="#e0e0e0" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Can Pull Tab Accent (Electric Pink) */}
        <mesh position={[0.2, 1.72, 0]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.45, 0.03, 0.25]} />
          <meshStandardMaterial color="#E56DB1" metalness={0.7} roughness={0.2} />
        </mesh>

        {/* Can Bottom Rim */}
        <mesh position={[0, -1.62, 0]}>
          <cylinderGeometry args={[1.05, 0.92, 0.14, 48]} />
          <meshStandardMaterial color="#33e4b8" metalness={0.85} roughness={0.15} />
        </mesh>

        {/* Holographic Accent Rings */}
        <mesh position={[0, 0.7, 0]}>
          <torusGeometry args={[1.06, 0.025, 16, 64]} />
          <meshBasicMaterial color="#33e4b8" />
        </mesh>
        <mesh position={[0, -0.7, 0]}>
          <torusGeometry args={[1.06, 0.025, 16, 64]} />
          <meshBasicMaterial color="#E56DB1" />
        </mesh>

        {/* Floating Ambient Micro-Rings */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.5, 0.015, 16, 64]} />
          <meshBasicMaterial color="#FFD84D" transparent opacity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

export function Piggy3DCanvas() {
  const mouse = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mouse.current = { x, y };
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
    >
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 6, 5]} intensity={2.2} color="#33e4b8" />
        <directionalLight position={[-4, -3, 3]} intensity={1.8} color="#E56DB1" />
        <pointLight position={[0, 0, 3]} intensity={1.5} color="#FFD84D" />
        <InteractiveCan mouse={mouse} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
