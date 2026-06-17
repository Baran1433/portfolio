import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { PremiumButton } from "../ui/PremiumButton";

const EASE = [0.22, 1, 0.36, 1];

function RotatingTitles() {
  const titles = ["Software Engineer", "Software Engineering Student"];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % titles.length), 2500);
    return () => clearInterval(id);
  }, []);
  return (
    <motion.span key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      {titles[idx]}
    </motion.span>
  );
}

export function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const [imgError, setImgError] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const photoX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const photoY = useTransform(springY, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40, scale: 0.98, filter: "blur(10px)" },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { delay: 0.55 + i * 0.1, duration: 0.7, ease: EASE },
    }),
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="section-snap section-surface section-tone-1 relative overflow-hidden pt-[96px] lg:pt-[104px]"
    >
      <div className="w-[88%] max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-96px)] lg:min-h-[calc(100vh-104px)] hero-scale">
      <div className="section-glow-divider pointer-events-none absolute inset-x-0 bottom-0 z-[2]" aria-hidden />

      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-[22%] h-24 w-24 rounded-full bg-[var(--primary-purple)]/20 blur-2xl"
        animate={{ y: [0, -14, 0], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.span
        aria-hidden
        className="pointer-events-none absolute right-[12%] bottom-[18%] h-32 w-32 rounded-full bg-[var(--primary-cyan)]/15 blur-3xl"
        animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* left content */}
      <div className="relative hero-content-shift flex flex-col items-start justify-center px-4 sm:px-6 py-8 lg:py-0">
        <div className="max-w-xl">
          <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp} className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--primary-cyan)]">
            {t("hero.greeting")}
          </motion.p>

          <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp} className="font-display text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] via-[#5b8df0] to-[#06b6d4] sm:text-5xl lg:text-5xl leading-tight">
            {t("hero.name")}
          </motion.h1>

          <motion.div custom={1.2} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }} className="mt-3 text-lg font-semibold text-[var(--text-muted)] sm:text-xl">
            <RotatingTitles />
          </motion.div>

          <motion.p custom={3} initial="hidden" animate="visible" variants={fadeUp} className="mt-5 max-w-md text-base leading-relaxed text-[var(--text-muted)]">
            {t("hero.intro")}
          </motion.p>

          <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <PremiumButton href="#projects" variant="primary" className="hero-cta">
              {t("hero.btnProjects")}
            </PremiumButton>
          </motion.div>
        </div>
      </div>

      {/* right profile */}
      <div className="relative flex items-center justify-end overflow-hidden px-4 sm:px-6 py-8 lg:py-0">
        <motion.div className="hero-profile-wrapper flex items-center justify-end w-full h-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }}>
          <div className="w-full max-w-[420px] flex items-center justify-end">
            <div className="relative">
              {!imgError ? (
                <div className="hero-avatar-wrapper relative w-[280px] h-[280px] sm:w-[300px] sm:h-[300px]">
                  <img src={import.meta.env.BASE_URL + "assets/profile.jpg"} alt={t("hero.name")} onError={() => setImgError(true)} className="hero-avatar rounded-full object-cover w-full h-full" draggable={false} />
                </div>
              ) : (
                <div className="hero-avatar-wrapper relative w-[280px] h-[280px] sm:w-[300px] sm:h-[300px]">
                  <div className="hero-avatar rounded-full w-full h-full flex items-center justify-center bg-gradient-to-br from-[rgba(124,58,237,0.18)] to-[rgba(6,182,212,0.06)]">
                    <span className="text-lg font-semibold text-[var(--text-main)]">{t("hero.initials") || "AB"}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
