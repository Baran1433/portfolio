import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "../../hooks/useReducedMotion";

// Use the project's neon palette: purple, blue, cyan (+ subtle accent)
const PALETTE_LIGHT = [
  new THREE.Color("#7c3aed"),
  new THREE.Color("#3b82f6"),
  new THREE.Color("#06b6d4"),
  new THREE.Color("#6366f1"),
];

const PALETTE_DARK = [
  new THREE.Color("#7c3aed"),
  new THREE.Color("#3b82f6"),
  new THREE.Color("#06b6d4"),
  new THREE.Color("#8b5cf6"),
];

function getParticleCount() {
  const w = window.innerWidth;
  if (w < 480) return 36;
  if (w < 768) return 52;
  if (w < 1200) return 68;
  return 85;
}

export function ParticleNetwork({ isDark }) {
  const mountRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || reducedMotion) return undefined;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particleCount = getParticleCount();
    let connectDist = width < 768 ? 110 : 145;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let visible = !document.hidden;
    let rafId = 0;
    let frame = 0;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 2000);
    camera.position.z = 420;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.className = "ambient-particles-three";

    const positions = new Float32Array(particleCount * 3);
    const velocities = [];
    const colors = new Float32Array(particleCount * 3);
    const palette = isDark ? PALETTE_DARK : PALETTE_LIGHT;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * width * 0.95;
      positions[i * 3 + 1] = (Math.random() - 0.5) * height * 0.95;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
      velocities.push({
        x: (Math.random() - 0.5) * 0.35,
        y: (Math.random() - 0.5) * 0.35,
        z: (Math.random() - 0.5) * 0.08,
      });
      const c = palette[i % palette.length];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      size: width < 768 ? 2.2 : 2.8,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.55 : 0.42,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, pointsMaterial);

    const maxSegments = particleCount * particleCount;
    const linePositions = new Float32Array(maxSegments * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage)
    );

    // Use a subtle purple-blue line color with low opacity for neon network look
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: isDark ? 0.12 : 0.10,
      depthWrite: false,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const group = new THREE.Group();
    group.add(points);
    group.add(lines);
    scene.add(group);

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      connectDist = width < 768 ? 110 : 145;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      pointsMaterial.size = width < 768 ? 2.2 : 2.8;
    };

    const onPointerMove = (e) => {
      targetMouseX = (e.clientX / width - 0.5) * 2;
      targetMouseY = (e.clientY / height - 0.5) * 2;
    };

    const onVisibility = () => {
      visible = !document.hidden;
    };

    const updateConnections = () => {
      const pos = geometry.attributes.position.array;
      let segIndex = 0;
      const distSq = connectDist * connectDist;

      for (let i = 0; i < particleCount; i++) {
        let connections = 0;
        for (let j = i + 1; j < particleCount; j++) {
          if (connections >= 3) break;
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < distSq) {
            linePositions[segIndex++] = pos[i * 3];
            linePositions[segIndex++] = pos[i * 3 + 1];
            linePositions[segIndex++] = pos[i * 3 + 2];
            linePositions[segIndex++] = pos[j * 3];
            linePositions[segIndex++] = pos[j * 3 + 1];
            linePositions[segIndex++] = pos[j * 3 + 2];
            connections += 1;
          }
        }
      }

      lineGeometry.setDrawRange(0, segIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;
    };

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (!visible) return;

      frame += 1;
      if (frame % 2 === 1) return;

      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      group.rotation.y = mouseX * 0.04;
      group.rotation.x = mouseY * 0.03;
      group.position.x = mouseX * 12;
      group.position.y = -mouseY * 10;

      const pos = geometry.attributes.position.array;
      const halfW = width * 0.52;
      const halfH = height * 0.52;

      for (let i = 0; i < particleCount; i++) {
        const v = velocities[i];
        pos[i * 3] += v.x;
        pos[i * 3 + 1] += v.y;
        pos[i * 3 + 2] += v.z;

        if (pos[i * 3] > halfW || pos[i * 3] < -halfW) v.x *= -1;
        if (pos[i * 3 + 1] > halfH || pos[i * 3 + 1] < -halfH) v.y *= -1;
        if (pos[i * 3 + 2] > 50 || pos[i * 3 + 2] < -50) v.z *= -1;
      }

      geometry.attributes.position.needsUpdate = true;
      updateConnections();
      renderer.render(scene, camera);
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      lineGeometry.dispose();
      pointsMaterial.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [isDark, reducedMotion]);

  if (reducedMotion) return null;

  return <div ref={mountRef} className="ambient-particles-three-wrap" aria-hidden />;
}
