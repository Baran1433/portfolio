import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAmbientMotion } from "../../hooks/useAmbientMotion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * Fixed premium ambient layer — aurora, blobs, particles, mouse glow.
 * Rendered on document.body so it stays behind all page content.
 */
export function AmbientBackground() {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const reducedMotion = useReducedMotion();
  const isDark = theme === "dark";

  useAmbientMotion(containerRef);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={containerRef}
      className={[
        "ambient-root",
        "fixed inset-0 overflow-hidden",
        isDark ? "ambient-root--dark" : "",
        reducedMotion ? "ambient-root--static" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <div className="ambient-base" />
      <div className="ambient-tone-mix" />
      <div className="ambient-aurora ambient-aurora--a" />
      <div className="ambient-aurora ambient-aurora--b" />
      <div className="ambient-aurora ambient-aurora--c" />
      <div className="ambient-aurora ambient-aurora--lavender" />

      <div className="ambient-blobs">
        <span className="ambient-blob ambient-blob--blue" />
        <span className="ambient-blob ambient-blob--gray" />
        <span className="ambient-blob ambient-blob--lavender" />
        <span className="ambient-blob ambient-blob--soft" />
      </div>

      <div className="ambient-mouse-glow" />
      <div className="ambient-horizon" />

      <div className="ambient-grain bg-noise" />
      <div className="ambient-vignette" />
    </div>,
    document.body
  );
}
