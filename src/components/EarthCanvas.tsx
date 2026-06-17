import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const EARTH_COLOR = "#4F7CFF";
const GLOW_COLOR = "#22D3EE";
const PARTICLE_COLOR = "#38bdf8";
const EMISSIVE = "#0f172a";

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color={EARTH_COLOR}
          emissive={EMISSIVE}
          roughness={0.45}
          metalness={0.15}
          wireframe
        />
      </mesh>

      <mesh scale={2.08}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color={GLOW_COLOR}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 900;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0008;
      particlesRef.current.rotation.x += 0.0003;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color={PARTICLE_COLOR} transparent opacity={0.75} />
    </points>
  );
}

export default function EarthCanvas() {
  return (
    <div className="earth-canvas-wrapper" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#e0e7ff" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a78bfa" />

        <Stars radius={80} depth={50} count={1200} factor={4} saturation={0} fade speed={1} />

        <FloatingParticles />
        <Earth />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
