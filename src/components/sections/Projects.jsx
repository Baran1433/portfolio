import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { projects } from "../../data/content";
import { SectionShell } from "../ui/SectionShell";
import { SectionReveal } from "../ui/SectionReveal";
import { StaggerContainer, StaggerItem } from "../ui/SectionReveal";
import { TiltCard } from "../ui/TiltCard";
import { SectionHeading } from "./SectionHeading";

function ProjectCard({ project, lang, labels, onOpen }) {
  return (
    <TiltCard className="group relative overflow-hidden content-card rounded-2xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <motion.img
          src={project.image}
          alt={project.title[lang]}
          className="mx-auto h-full w-full object-contain transition-transform duration-700 ease-premium"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
        <button
          type="button"
          onClick={() => onOpen(project.id)}
          className="absolute inset-0 z-10 flex items-center justify-center bg-transparent transition duration-300 group-hover:bg-slate-950/10"
          aria-label={project.title[lang]}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="relative flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          >
            {labels.viewProject}
            <ArrowUpRight size={16} />
          </motion.span>
        </button>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-slate-800 dark:text-slate-100">
          {project.title[lang]}
        </h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {project.desc[lang]}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent hover:bg-slate-800"
          >
            <ExternalLink size={16} className="mr-2" />
            {labels.github}
          </a>
        </div>
      </div>
    </TiltCard>
  );
}

export function Projects() {
  const { lang, t } = useLanguage();
  const reduced = useReducedMotion();
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [swipeStartX, setSwipeStartX] = useState(null);

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) || null,
    [activeProjectId]
  );

  const labels = {
    viewProject: t("projects.viewProject"),
    github: t("projects.github"),
  };

  const closeModal = useCallback(() => {
    setActiveProjectId(null);
    setActiveImageIndex(0);
    setSwipeStartX(null);
  }, []);

  const showPrev = useCallback(() => {
    if (!activeProject) return;
    setActiveImageIndex((current) =>
      current === 0 ? activeProject.screenshots.length - 1 : current - 1
    );
  }, [activeProject]);

  const showNext = useCallback(() => {
    if (!activeProject) return;
    setActiveImageIndex((current) => (current + 1) % activeProject.screenshots.length);
  }, [activeProject]);

  useEffect(() => {
    if (!activeProject) return;
    setActiveImageIndex(0);
  }, [activeProject]);

  useEffect(() => {
    if (!activeProject) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
      if (event.key === "ArrowLeft") {
        showPrev();
      }
      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProject, closeModal, showNext, showPrev]);

  const handlePointerDown = (event) => {
    setSwipeStartX(event.clientX);
  };

  const handlePointerUp = (event) => {
    if (swipeStartX === null) return;
    const delta = event.clientX - swipeStartX;
    if (delta > 60) showPrev();
    if (delta < -60) showNext();
    setSwipeStartX(null);
  };

  return (
    <SectionShell id="projects" variant={3}>
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <SectionHeading title={t("projects.title")} subtitle={t("projects.subtitle")} />
        </SectionReveal>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} lang={lang} labels={labels} onOpen={setActiveProjectId} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            key="project-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/80 backdrop-blur-xl p-4"
            aria-modal="true"
            role="dialog"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 z-50 rounded-full bg-black/70 p-3 text-white transition hover:bg-black"
              aria-label="Close gallery"
            >
              <X size={18} />
            </button>
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-2xl backdrop-blur-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex flex-col gap-6 p-6 sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-white">
                      {activeProject.title[lang]}
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm text-slate-400">
                      {activeProject.desc[lang]}
                    </p>
                  </div>
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent hover:bg-slate-800"
                  >
                    <ExternalLink size={16} />
                    {labels.github}
                  </a>
                </div>

                <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-900">
                  <div
                    className="relative"
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={() => setSwipeStartX(null)}
                  >
                    <motion.img
                      key={activeProject.screenshots[activeImageIndex]}
                      src={activeProject.screenshots[activeImageIndex]}
                      alt={`${activeProject.title[lang]} screenshot ${activeImageIndex + 1}`}
                      className="mx-auto h-[420px] w-full object-contain bg-slate-900 sm:h-[520px]"
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                      <button
                        type="button"
                        onClick={showPrev}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black"
                        aria-label="Previous screenshot"
                      >
                        <ArrowLeft size={20} />
                      </button>
                      <button
                        type="button"
                        onClick={showNext}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black"
                        aria-label="Next screenshot"
                      >
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent px-6 py-5">
                    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-200 sm:text-base">
                      <span>{`${activeImageIndex + 1} / ${activeProject.screenshots.length}`}</span>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-white/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
}
