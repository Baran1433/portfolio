import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { skills } from "../../data/content";
import { SectionShell } from "../ui/SectionShell";
import { SectionReveal } from "../ui/SectionReveal";
import { StaggerContainer, StaggerItem } from "../ui/SectionReveal";
import { TiltCard } from "../ui/TiltCard";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  const { t } = useLanguage();

  return (
    <SectionShell id="skills" variant={2}>
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <SectionHeading title={t("skills.title")} subtitle={t("skills.subtitle")} />
        </SectionReveal>

        <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <StaggerItem key={skill.name}>
                <TiltCard maxTilt={6}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="group flex flex-col items-center gap-3 content-card rounded-2xl p-6"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <span className="text-sm font-semibold text-[var(--text-main)]">
                      {skill.name}
                    </span>
                  </motion.div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </SectionShell>
  );
}
