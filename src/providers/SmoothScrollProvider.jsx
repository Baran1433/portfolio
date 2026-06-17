import Lenis from "lenis";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const SmoothScrollContext = createContext({
  scrollY: 0,
  progress: 0,
  lenis: null,
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const updateFromWindow = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setScrollY(y);
      setProgress(docHeight > 0 ? Math.min(y / docHeight, 1) : 0);
    };

    if (reducedMotion) {
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      updateFromWindow();
      window.addEventListener("scroll", updateFromWindow, { passive: true });
      return () => window.removeEventListener("scroll", updateFromWindow);
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 0.95,
    });

    lenisRef.current = lenis;
    document.documentElement.classList.add("lenis", "lenis-smooth");

    lenis.on("scroll", ({ scroll, progress: p }) => {
      setScrollY(scroll);
      setProgress(p);
      document.documentElement.style.setProperty("--ambient-scroll", String(p));
      window.dispatchEvent(new CustomEvent("portfolio-scroll"));
    });

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -88, duration: 1.4 });
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onAnchorClick);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  const value = useMemo(
    () => ({ scrollY, progress, lenis: lenisRef.current }),
    [scrollY, progress]
  );

  return (
    <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>
  );
}
