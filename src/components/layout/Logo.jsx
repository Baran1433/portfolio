import { motion } from "framer-motion";

export function Logo({ label }) {
  return (
    <motion.a
      href="#hero"
      aria-label={label}
      className="font-display text-xl font-bold tracking-tight"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="text-accent">B</span>
      <span className="text-[var(--text-secondary)]">U</span>
    </motion.a>
  );
}
