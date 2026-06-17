import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const EASE = [0.22, 1, 0.36, 1];

export function TiltCard({ children, className = "", maxTilt = 8 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 280, damping: 24 });
  const springY = useSpring(rotateY, { stiffness: 280, damping: 24 });

  const handleMove = (e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * maxTilt * 2);
    rotateX.set(-y * maxTilt * 2);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={`tilt-card ${className}`}
    >
      {children}
    </motion.div>
  );
}
