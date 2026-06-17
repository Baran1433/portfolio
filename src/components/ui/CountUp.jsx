import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function CountUp({ value, suffix = "", duration = 1800, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduced) {
      setCount(value);
      return undefined;
    }

    let rafId = 0;
    const startTime = performance.now();

    const step = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      setCount(Math.round(eased * value));
      if (t < 1) rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}
