import { motion } from "framer-motion";

import { useLanguage } from "../../context/LanguageContext";

import { useReducedMotion } from "../../hooks/useReducedMotion";



export function Footer() {

  const { t } = useLanguage();

  const year = new Date().getFullYear();

  const reduced = useReducedMotion();



  return (

    <footer className="section-surface section-tone-2 relative overflow-hidden px-6 py-8 text-center text-sm text-[var(--text-muted)]">

      <div className="section-glow-divider absolute inset-x-0 top-0" aria-hidden />



      {!reduced && (

        <>

          <motion.div

            aria-hidden

            className="pointer-events-none absolute -left-1/4 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-[var(--primary-purple)]/50 to-transparent"

            animate={{ x: ["0%", "200%"] }}

            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}

          />

          <motion.div

            aria-hidden

            className="pointer-events-none absolute -right-1/4 bottom-0 h-px w-1/2 bg-gradient-to-r from-transparent via-[var(--primary-cyan)]/40 to-transparent"

            animate={{ x: ["-200%", "0%"] }}

            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}

          />

          <motion.div

            aria-hidden

            className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary-purple)]/10 blur-3xl"

            animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}

            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}

          />

        </>

      )}



      <p className="relative z-10 text-[var(--text-muted)]">

        © {year} Baran Uçar · {t("footer.location")} · {t("footer.rights")}

      </p>

    </footer>

  );

}

