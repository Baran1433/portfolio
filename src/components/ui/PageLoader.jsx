import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const EASE = [0.22, 1, 0.36, 1];

export function PageLoader() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return !window.sessionStorage.getItem("portfolio-loaded");
  });

  useEffect(() => {
    if (reduced) {
      setVisible(false);
      return undefined;
    }

    const minDisplay = 900;
    const start = performance.now();

    const finish = () => {
      const elapsed = performance.now() - start;
      const delay = Math.max(0, minDisplay - elapsed);
      const timer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem("portfolio-loaded", "1");
      }, delay);
      return () => clearTimeout(timer);
    };

    if (document.readyState === "complete") {
      return finish();
    }

    const onLoad = () => finish();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, [reduced]);

  if (reduced || !visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-section-1"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-purple-400/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />

          <motion.div
            className="relative flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <motion.div
              className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/20 bg-white/80 shadow-[0_8px_40px_rgba(79,124,255,0.15)] backdrop-blur-md dark:bg-slate-900/80"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="font-display text-xl font-bold text-accent">BU</span>
              <motion.span
                className="absolute -inset-1 rounded-2xl border border-accent/30"
                animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            <div className="text-center">
              <motion.p
                className="font-display text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                Baran Uçar
              </motion.p>
              <motion.p
                className="mt-1 text-sm text-slate-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                Portfolio
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-[18%] left-1/2 h-0.5 w-32 -translate-x-1/2 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-700/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full origin-left rounded-full bg-gradient-to-r from-accent via-cyan-400 to-purple-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.35 }}
            />
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-0"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.75, ease: EASE }}
            style={{
              background:
                "linear-gradient(180deg, transparent 60%, rgba(248,250,255,0.98) 100%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
