import { AnimatePresence } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { certificates } from "../../data/content";
import { SectionShell } from "../ui/SectionShell";
import { SectionReveal } from "../ui/SectionReveal";
import { StaggerContainer, StaggerItem } from "../ui/SectionReveal";
import { TiltCard } from "../ui/TiltCard";
import { SectionHeading } from "./SectionHeading";
import { CertificateModal } from "../ui/CertificateModal";

export function Certificates() {
  const { lang, t } = useLanguage();
  const [activeCertificateId, setActiveCertificateId] = useState(null);

  const activeCertificate = useMemo(
    () => certificates.find((cert) => cert.id === activeCertificateId) || null,
    [activeCertificateId]
  );

  const closeModal = useCallback(() => {
    setActiveCertificateId(null);
  }, []);

  useEffect(() => {
    if (!activeCertificate) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCertificate, closeModal]);

  return (
    <SectionShell id="certificates" variant={2}>
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <SectionHeading title={t("certificates.title")} subtitle={t("certificates.subtitle")} />
        </SectionReveal>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <StaggerItem key={cert.id} className="h-full">
              <TiltCard className="group relative overflow-hidden content-card rounded-2xl h-full">
                <button
                  type="button"
                  onClick={() => setActiveCertificateId(cert.id)}
                  className="flex h-full w-full flex-col text-left"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                    {cert.type === "image" ? (
                      <img
                        src={cert.image}
                        alt={cert.title[lang]}
                        className="h-full w-full object-contain p-2 transition duration-500 ease-premium group-hover:scale-105"
                      />
                    ) : (
                      <iframe
                        src={cert.image}
                        title={cert.title[lang]}
                        className="pointer-events-none h-full w-full"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-transparent transition duration-300 group-hover:bg-slate-950/10">
                      <span className="flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-semibold text-slate-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <ArrowUpRight size={16} />
                        Önizle
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-xs uppercase tracking-[0.24em] text-white">
                      <FileText size={16} />
                      {cert.year}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{cert.title[lang]}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/80">
                      {cert.issuer[lang]}
                    </p>
                  </div>
                </button>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <AnimatePresence>
        {activeCertificate && (
          <CertificateModal
            certificate={activeCertificate}
            lang={lang}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </SectionShell>
  );
}
