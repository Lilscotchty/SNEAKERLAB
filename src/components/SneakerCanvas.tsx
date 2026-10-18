import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, OrbitControls, Float } from '@react-three/drei';
import { useRef } from 'react';
import type { Group } from 'three';
import type { FrameSet } from './SneakerLab';

const PALETTE: Record<string, { upper: string; sole: string; accent: string; lace: string }> = {
  runner: { upper: '#f2f0ec', sole: '#ffffff', accent: '#1a1a1a', lace: '#e5e2dc' },
  court: { upper: '#d9c27a', sole: '#b5743a', accent: '#2b2b2b', lace: '#efe9da' },
  trail: { upper: '#4a5d43', sole: '#2e2a26', accent: '#c65f38', lace: '#8a9082' },
};

function SneakerModel({ palette }: { palette: { upper: string; sole: string; accent: string; lace: string } }) {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
  });

  return (
    <group ref={group} rotation={[0.1, -0.4, 0]}>
      {/* Sole */}
      <mesh position={[0, -0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 0.4, 1.4]} />
        <meshStandardMaterial color={palette.sole} roughness={0.85} />
      </mesh>
      {/* Upper */}
      <mesh position={[-0.2, 0, 0]} castShadow>
        <boxGeometry args={[2.8, 0.6, 1.2]} />
        <meshStandardMaterial color={palette.upper} roughness={0.6} />
      </mesh>
      {/* Heel counter */}
      <mesh position={[1.2, 0.1, 0]} castShadow>
        <boxGeometry args={[0.9, 0.8, 1.15]} />
        <meshStandardMaterial color={palette.upper} roughness={0.6} />
      </mesh>
      {/* Toe cap */}
      <mesh position={[-1.6, -0.1, 0]} castShadow>
        <boxGeometry args={[0.6, 0.4, 1.1]} />
        <meshStandardMaterial color={palette.accent} roughness={0.5} />
      </mesh>
      {/* Tongue */}
      <mesh position={[-0.3, 0.5, 0]} castShadow>
        <boxGeometry args={[1.4, 0.35, 0.9]} />
        <meshStandardMaterial color={palette.upper} roughness={0.7} />
      </mesh>
      {/* Laces */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-0.85 + i * 0.45, 0.72, 0]} castShadow>
          <boxGeometry args={[0.14, 0.1, 0.95]} />
          <meshStandardMaterial color={palette.lace} roughness={0.8} />
        </mesh>
      ))}
      {/* Swoosh stripe */}
      <mesh position={[0, 0, 0.62]} castShadow>
        <boxGeometry args={[1.8, 0.22, 0.02]} />
        <meshStandardMaterial color={palette.accent} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, -0.62]} castShadow>
        <boxGeometry args={[1.8, 0.22, 0.02]} />
        <meshStandardMaterial color={palette.accent} roughness={0.4} />
      </mesh>
    </group>
  );
}

export default function SneakerCanvas({
  activeFeature,
  interacted,
  onInteract,
}: {
  activeFeature: FrameSet;
  interacted: boolean;
  onInteract: () => void;
}) {
  const palette = PALETTE[activeFeature.id] ?? PALETTE.runner;

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 1.2, 5.2], fov: 40 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} castShadow />
      <directionalLight position={[-4, 2, -3]} intensity={0.4} />

      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
        <SneakerModel palette={palette} />
      </Float>

      <ContactShadows position={[0, -0.9, 0]} opacity={0.45} scale={10} blur={2.4} far={2} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={!interacted}
        autoRotateSpeed={1.6}
        onStart={onInteract}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
}
