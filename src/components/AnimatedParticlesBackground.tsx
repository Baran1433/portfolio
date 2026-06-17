import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "../hooks/useReducedMotion";

const PALETTE = ["#7c3aed", "#3b82f6", "#06b6d4", "#6366f1"];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
}

function getCount(width: number) {
  if (width < 480) return 28;
  if (width < 768) return 42;
  if (width < 1200) return 55;
  return 68;
}

function getConnectDistance(width: number) {
  return width < 768 ? 100 : 130;
}

export function AnimatedParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !mounted || reducedMotion) return undefined;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    const palette = PALETTE;
    const lineColor = "124, 58, 237";

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Particle[] = [];
    let connectDist = getConnectDistance(width);
    let mouseX = width * 0.5;
    let mouseY = height * 0.5;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let offsetX = 0;
    let offsetY = 0;
    let visible = !document.hidden;
    let rafId = 0;
    let frame = 0;

    const createParticles = () => {
      const count = getCount(width);
      connectDist = getConnectDistance(width);
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 0.9 + Math.random() * 1.2,
        color: palette[i % palette.length] ?? palette[0],
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      if (!visible) return;

      frame += 1;
      const skipFrame = width < 768 && frame % 2 !== 0;
      if (skipFrame) return;

      offsetX += (targetMouseX - width * 0.5 - offsetX) * 0.04;
      offsetY += (targetMouseY - height * 0.5 - offsetY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const drawX = p.x + offsetX * 0.02;
        const drawY = p.y + offsetY * 0.02;

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}b8`;
        ctx.fill();
      }

      const distSq = connectDist * connectDist;
      for (let i = 0; i < particles.length; i++) {
        let links = 0;
        for (let j = i + 1; j < particles.length; j++) {
          if (links >= 3) break;
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < distSq) {
            const alpha = (1 - Math.sqrt(d2) / connectDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(a.x + offsetX * 0.02, a.y + offsetY * 0.02);
            ctx.lineTo(b.x + offsetX * 0.02, b.y + offsetY * 0.02);
            ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
            links += 1;
          }
        }
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const onVisibility = () => {
      visible = !document.hidden;
    };

    resize();
    rafId = requestAnimationFrame(draw);

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [mounted, reducedMotion]);

  if (!mounted || reducedMotion) return null;

  return createPortal(
    <canvas
      ref={canvasRef}
      className="particles-background animated-particles-bg"
      aria-hidden
    />,
    document.body
  );
}

export default AnimatedParticlesBackground;
