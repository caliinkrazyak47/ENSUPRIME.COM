import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function VinylDisc({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Ambient spin + gentle mouse tilt
    groupRef.current.rotation.z -= delta * 0.45;
    const targetRotX = mouse.current.y * 0.35 + 0.35;
    const targetRotY = mouse.current.x * 0.45 - 0.2;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Vinyl Base Cylinder Disc */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[2.2, 2.2, 0.06, 64]} />
          <meshStandardMaterial
            color="#090909"
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>

        {/* Vinyl Grooves Ribbons (Subtle Metallic Rings) */}
        {[1.9, 1.6, 1.3, 1.0].map((radius, idx) => (
          <mesh key={idx} position={[0, 0.035, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius - 0.08, radius, 64]} />
            <meshStandardMaterial
              color="#1a1a1c"
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>
        ))}

        {/* Center Label Badge (Editorial White & Violet Ring) */}
        <mesh position={[0, 0.036, 0]}>
          <cylinderGeometry args={[0.75, 0.75, 0.01, 48]} />
          <meshStandardMaterial color="#F4F1EC" roughness={0.4} />
        </mesh>

        {/* Violet Electric Inner Accent */}
        <mesh position={[0, 0.038, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.015, 32]} />
          <meshStandardMaterial color="#8B5CF6" metalness={0.5} roughness={0.3} />
        </mesh>

        {/* Spindle Center Hole */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.08, 32]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Subtle Outer Neon Floating Ring */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.5, 0.015, 16, 80]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.35} />
        </mesh>
      </group>
    </Float>
  );
}

export function HeroScene() {
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
      className="w-full h-full relative select-none pointer-events-auto"
    >
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[4, 5, 4]} intensity={2.5} color="#D8D8DB" />
        <directionalLight position={[-4, -3, 2]} intensity={1.8} color="#8B5CF6" />
        <pointLight position={[0, 2, 3]} intensity={1.2} color="#FFFFFF" />
        <VinylDisc mouse={mouse} />
      </Canvas>
    </div>
  );
}
