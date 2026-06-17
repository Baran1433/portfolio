import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

export function LanguageToggle({ label }) {
  const { lang, toggleLang } = useLanguage();

  return (
    <motion.button
      type="button"
      onClick={toggleLang}
      aria-label={label}
      className="flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/80 px-3.5 py-2 text-xs font-semibold tracking-wide text-slate-500 shadow-soft backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300"
      whileHover={{ scale: 1.04, boxShadow: "0 4px 20px rgba(79,124,255,0.15)" }}
      whileTap={{ scale: 0.96 }}
    >
      <span className={lang === "tr" ? "text-accent" : "text-slate-400"}>TR</span>
      <span className="text-slate-300">/</span>
      <span className={lang === "en" ? "text-accent" : "text-slate-400"}>EN</span>
    </motion.button>
  );
}
