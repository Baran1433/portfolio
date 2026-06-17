import { Canvas, useFrame } from "@react-three/fiber";
import {
  Bounds,
  Environment,
  Html,
  OrbitControls,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const MODEL_PATH = "/models/scene.glb";

useGLTF.preload(MODEL_PATH);

function optimizeScene(object: THREE.Object3D) {
  object.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh) return;

    mesh.frustumCulled = true;
    mesh.castShadow = false;
    mesh.receiveShadow = false;

    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    materials.forEach((mat) => {
      if (mat instanceof THREE.MeshStandardMaterial && mat.map) {
        mat.map.anisotropy = 4;
      }
    });
  });
}

function ModelLoader() {
  const { progress, active } = useProgress();

  if (!active) return null;

  return (
    <Html center zIndexRange={[200, 0]}>
      <div className="model-loader-panel" role="status" aria-live="polite">
        <div className="model-loader-ring" aria-hidden />
        <p className="model-loader-text">3D model yükleniyor</p>
        <p className="model-loader-percent">{Math.round(progress)}%</p>
        <div className="model-loader-bar">
          <span style={{ width: `${Math.round(progress)}%` }} />
        </div>
      </div>
    </Html>
  );
}

function DeskModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  const model = useMemo(() => {
    const cloned = scene.clone(true);
    optimizeScene(cloned);
    return cloned;
  }, [scene]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[8, 12, 6]} intensity={1.15} color="#f8fafc" />
      <directionalLight position={[-6, 8, -4]} intensity={0.4} color="#c4b5fd" />
      <directionalLight position={[0, 5, -10]} intensity={0.28} color="#67e8f9" />

      <Environment preset="studio" background={false} environmentIntensity={0.9} />

      <Bounds fit clip observe margin={0.92} maxDuration={1}>
        <DeskModel />
      </Bounds>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom
        zoomSpeed={0.65}
        minDistance={2}
        maxDistance={28}
        maxPolarAngle={Math.PI / 2.02}
        autoRotate
        autoRotateSpeed={0.22}
        dampingFactor={0.06}
      />

      <ModelLoader />
    </>
  );
}

export default function ModelCanvas() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="contact-model contact-model-view" aria-label="3D çalışma alanı modeli">
      <Canvas
        camera={{ position: [0, 1.5, 7], fov: 42, near: 0.1, far: 250 }}
        dpr={isMobile ? [1, 1.35] : [1, 1.75]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
