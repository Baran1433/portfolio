import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { stats } from "../../data/content";
import { CountUp } from "../ui/CountUp";
import { StaggerContainer, StaggerItem } from "../ui/SectionReveal";

export function StatsBar() {
  const { lang } = useLanguage();

  return (
    <StaggerContainer className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      {stats.map((item) => (
        <StaggerItem key={item.id}>
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="content-card rounded-2xl px-4 py-6 text-center"
          >
            <p className="font-display text-3xl font-bold text-accent sm:text-4xl">
              <CountUp value={item.value} suffix={item.suffix} />
            </p>
            <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
              {item.label[lang]}
            </p>
          </motion.div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
