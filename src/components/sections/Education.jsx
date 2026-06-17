import { useLanguage } from "../../context/LanguageContext";
import { education } from "../../data/content";
import { SectionShell } from "../ui/SectionShell";
import { SectionReveal } from "../ui/SectionReveal";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  const { lang, t } = useLanguage();

  return (
    <SectionShell id="education" variant={1}>
      <div className="mx-auto max-w-3xl">
        <SectionReveal>
          <SectionHeading title={t("education.title")} subtitle={t("education.subtitle")} />
        </SectionReveal>

        <div className="relative space-y-0">
          <div
            className="absolute bottom-2 left-[7px] top-2 w-[1.5px] bg-gradient-to-b from-accent/30 via-accent/15 to-transparent"
            aria-hidden
          />
          {education.map((item, i) => (
            <SectionReveal key={i} delay={i * 0.08}>
              <div className="relative flex gap-6 pb-10 last:pb-0">
                <div
                  className="relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-section-1 bg-accent shadow-[0_0_0_4px_rgba(79,124,255,0.2)]"
                  aria-hidden
                />
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {item.period}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-semibold text-white">
                    {item.title[lang]}
                  </h3>
                  <p className="text-base font-medium text-slate-300">{item.school[lang]}</p>
                  <p className="mt-2 text-base leading-relaxed text-slate-300">{item.desc[lang]}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
