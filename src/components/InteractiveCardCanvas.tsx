import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Physics, RigidBody, useSpringJoint } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader, Color, Euler, MeshStandardMaterial, Quaternion, Texture, Vector3, DoubleSide } from "three";
import type { RapierRigidBody } from "@react-three/rapier";

function RibbonTrail() {
  const points = useMemo(
    () => [
      new Vector3(-0.9, 0.28, 0.16),
      new Vector3(-0.36, 0.16, 0.08),
      new Vector3(0.06, 0.08, -0.03),
      new Vector3(0.44, 0.02, 0.12),
      new Vector3(0.86, -0.16, -0.08),
    ],
    []
  );

  const geometry = useMemo(() => {
    const line = new MeshLineGeometry();
    line.setPoints(points);
    return line;
  }, [points]);

  const material = useMemo(
    () =>
      new MeshLineMaterial({
        color: new Color("#9d7aed"),
        lineWidth: 0.02,
        transparent: true,
        opacity: 0.88,
        depthTest: false,
        side: DoubleSide,
      }),
    []
  );

  return (
    <mesh geometry={geometry} position={[0, 0.04, 0]}>
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function CardModel({ gltf, texture }: { gltf: any; texture: Texture | null }) {
  const cardMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new Color("#111827"),
        emissive: new Color("#2f73ff"),
        emissiveIntensity: 0.16,
        metalness: 0.65,
        roughness: 0.22,
      }),
    []
  );

  return gltf?.scene ? (
    <primitive object={gltf.scene} scale={0.95} position={[0, -0.03, 0]} />
  ) : (
    <group>
      <mesh>
        <boxGeometry args={[1.18, 0.72, 0.14]} />
        <primitive object={cardMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 0, 0.078]}>
        <planeGeometry args={[1.08, 0.5]} />
        <meshBasicMaterial
          color={texture ? "white" : "#0f172a"}
          map={texture ?? undefined}
          transparent={Boolean(texture)}
          opacity={texture ? 1 : 0.72}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function DraggableFloatingCard() {
  const cardRef = useRef<RapierRigidBody | null>(null);
  const anchorRef = useRef<RapierRigidBody | null>(null);
  const [gltf, setGltf] = useState<any>(null);
  const [texture, setTexture] = useState<Texture | null>(null);
  const [dragging, setDragging] = useState(false);

  useSpringJoint(anchorRef, cardRef, [new Vector3(0, 0.08, 0), new Vector3(0, 0, 0), 0.34, 42, 6]);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      "/assets/kartu.glb",
      (loaded) => setGltf(loaded),
      undefined,
      () => setGltf(null)
    );

    const textureLoader = new TextureLoader();
    textureLoader.load(
      "/assets/bandd.png",
      (loaded) => setTexture(loaded),
      undefined,
      () => setTexture(null)
    );
  }, []);

  const targetPosition = useMemo(() => new Vector3(0, 0.2, 0), []);
  const targetRotation = useMemo(() => new Quaternion(), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (!cardRef.current || dragging) return;

    targetPosition.set(0, 0.2 + Math.sin(time * 1.3) * 0.05, 0);
    cardRef.current.setTranslation(targetPosition, true);

    targetRotation.setFromEuler(new Euler(Math.sin(time * 0.35) * 0.05, Math.sin(time * 0.18) * 0.08, Math.sin(time * 0.27) * 0.04));
    cardRef.current.setRotation(targetRotation, true);
  });

  const handlePointerDown = (event: any) => {
    event.stopPropagation();
    setDragging(true);
    event.target.setPointerCapture(event.pointerId);
    cardRef.current?.setLinvel({ x: 0, y: 0, z: 0 }, true);
  };

  const handlePointerMove = (event: any) => {
    if (!dragging || !cardRef.current) return;
    event.stopPropagation();
    const nextPosition = event.point.clone();
    nextPosition.z = 0;
    cardRef.current.setTranslation(nextPosition, true);
  };

  const handlePointerUp = (event: any) => {
    event.stopPropagation();
    setDragging(false);
    event.target.releasePointerCapture(event.pointerId);
    cardRef.current?.applyImpulse({ x: 0, y: 0.28, z: 0 }, true);
    cardRef.current?.applyTorqueImpulse({ x: 0.02, y: 0.08, z: 0.01 }, true);
  };

  return (
    <>
      <RigidBody ref={anchorRef} type="fixed" colliders={false} position={[0, 0, 0]} />
      <RigidBody
        ref={cardRef}
        type="dynamic"
        colliders="cuboid"
        restitution={0.48}
        friction={0.6}
        linearDamping={0.8}
        angularDamping={0.8}
        position={[0, 0.18, 0]}
      >
        <group
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerOver={(event) => event.stopPropagation()}
          onPointerOut={(event) => event.stopPropagation()}
          dispose={null}
          scale={1.02}
        >
          <CardModel gltf={gltf} texture={texture} />
          <RibbonTrail />
        </group>
      </RigidBody>
    </>
  );
}

export function InteractiveCardCanvas() {
  return (
    <div className="interactive-card-canvas" style={{ width: "100%", height: "100%" }}>
      <Canvas shadows flat linear camera={{ position: [0, 0.5, 2.8], fov: 30 }}>
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.7} />
        <spotLight position={[2.6, 2.6, 2.2]} angle={0.28} penumbra={0.5} intensity={1.2} color="#8b5cf6" />
        <spotLight position={[-2.1, 1.8, 2.8]} angle={0.3} penumbra={0.6} intensity={0.8} color="#22d3ee" />
        <Environment background={false} preset="city">
          <Lightformer
            intensity={1.2}
            rotation={[0, Math.PI / 2, 0]}
            position={[-1.5, 1.2, -1.4]}
            scale={[3, 0.3, 1]}
            color="#7c3aed"
          />
          <Lightformer
            intensity={0.65}
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, 1.8, -1.8]}
            scale={[4, 0.25, 1]}
            color="#06b6d4"
          />
        </Environment>
        <Physics gravity={[0, -1.2, 0]}>
          <DraggableFloatingCard />
        </Physics>
      </Canvas>
    </div>
  );
}
