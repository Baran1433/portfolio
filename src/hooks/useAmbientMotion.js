import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

const LERP = 0.038;

/** Bölüme göre arka plan ton ağırlıkları (mavi / lavanta / gri) */
const SECTION_TONES = {
  hero: { blue: 0.52, lavender: 0.2, gray: 0.38 },
  about: { blue: 0.38, lavender: 0.16, gray: 0.52 },
  skills: { blue: 0.48, lavender: 0.32, gray: 0.4 },
  projects: { blue: 0.44, lavender: 0.4, gray: 0.36 },
  experience: { blue: 0.42, lavender: 0.24, gray: 0.5 },
  education: { blue: 0.4, lavender: 0.22, gray: 0.48 },
  certificates: { blue: 0.46, lavender: 0.28, gray: 0.42 },
  blog: { blue: 0.45, lavender: 0.35, gray: 0.4 },
  contact: { blue: 0.5, lavender: 0.3, gray: 0.44 },
};

const DEFAULT_TONE = SECTION_TONES.hero;
const SECTION_IDS = Object.keys(SECTION_TONES);

export function useAmbientMotion(containerRef) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let targetX = 0.5;
    let targetY = 0.5;
    let currentX = 0.5;
    let currentY = 0.5;
    let scrollProgress = 0;
    let targetTone = { ...DEFAULT_TONE };
    let currentTone = { ...DEFAULT_TONE };
    let rafId = 0;
    let active = true;

    const applyVars = () => {
      el.style.setProperty("--ambient-x", String(currentX));
      el.style.setProperty("--ambient-y", String(currentY));
      el.style.setProperty("--ambient-scroll", String(scrollProgress));
      el.style.setProperty("--ambient-tone-blue", String(currentTone.blue));
      el.style.setProperty("--ambient-tone-lavender", String(currentTone.lavender));
      el.style.setProperty("--ambient-tone-gray", String(currentTone.gray));
    };

    const lerpTone = () => {
      currentTone.blue += (targetTone.blue - currentTone.blue) * 0.04;
      currentTone.lavender += (targetTone.lavender - currentTone.lavender) * 0.04;
      currentTone.gray += (targetTone.gray - currentTone.gray) * 0.04;
    };

    const onPointerMove = (e) => {
      targetX = e.clientX / window.innerWidth;
      targetY = e.clientY / window.innerHeight;
    };

    const onScroll = () => {
      const fromCss = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--ambient-scroll")
      );
      if (!Number.isNaN(fromCss) && fromCss >= 0) {
        scrollProgress = Math.min(fromCss, 1);
      } else {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0;
      }
      applyVars();
    };

    const ratios = new Map();

    const pickSection = () => {
      let bestId = "hero";
      let bestRatio = 0;
      for (const [id, ratio] of ratios) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }
      const next = SECTION_TONES[bestId] ?? DEFAULT_TONE;
      targetTone = { ...next };
      el.setAttribute("data-ambient-section", bestId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        pickSection();
      },
      { threshold: [0, 0.15, 0.35, 0.55], rootMargin: "-12% 0px -12% 0px" }
    );

    for (const id of SECTION_IDS) {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    }

    const tick = () => {
      if (!active) return;

      if (!reducedMotion) {
        currentX += (targetX - currentX) * LERP;
        currentY += (targetY - currentY) * LERP;
        lerpTone();
      }

      applyVars();
      rafId = requestAnimationFrame(tick);
    };

    onScroll();
    applyVars();
    el.setAttribute("data-ambient-section", "hero");

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("portfolio-scroll", onScroll, { passive: true });

    if (!reducedMotion) {
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      active = false;
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("portfolio-scroll", onScroll);
    };
  }, [containerRef, reducedMotion]);
}
