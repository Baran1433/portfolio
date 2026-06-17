import { useLanguage } from "../../context/LanguageContext";
import { SectionShell } from "../ui/SectionShell";
import { SectionReveal } from "../ui/SectionReveal";
import { SectionHeading } from "./SectionHeading";
import { StatsBar } from "./StatsBar";

export function About() {
  const { t } = useLanguage();

  return (
    <SectionShell id="about" variant={1}>
      <div className="mx-auto max-w-3xl">
        <SectionReveal>
          <SectionHeading title={t("about.title")} />
          <div className="space-y-5 text-center text-lg leading-relaxed font-medium">
            <p className="text-slate-300">{t("about.p1")}</p>
            <p className="text-slate-300">{t("about.p2")}</p>
          </div>
        </SectionReveal>
        <StatsBar />
      </div>
    </SectionShell>
  );
}
