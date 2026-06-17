import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { useSmoothScroll } from "../../providers/SmoothScrollProvider";
import { LanguageToggle } from "./LanguageToggle";
import { Logo } from "./Logo";
import { useEffect, useState } from "react";

const EASE = [0.22, 1, 0.36, 1];

export function Navbar() {
  const { t } = useLanguage();
  const { scrollY } = useSmoothScroll();
  const scrolled = scrollY > 40;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const sections = ["#about", "#skills", "#projects", "#experience", "#education", "#contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { root: null, threshold: 0.45 }
    );
    sections.forEach((s) => {
      const el = document.querySelector(s);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.85, duration: 0.65, ease: EASE }}
      className="fixed left-0 right-0 top-0 z-50 flex justify-center px-[3%] pt-3 sm:pt-4"
    >
      <motion.div
        animate={{
          height: scrolled ? 64 : 72,
          boxShadow: scrolled
            ? "0 8px 32px rgba(124, 58, 237, 0.14), inset 0 1px 0 rgba(255,255,255,0.05)"
            : "0 4px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
        transition={{ duration: 0.45, ease: EASE }}
        className="navbar-glass flex w-[94%] max-w-[1200px] items-center justify-between rounded-2xl px-5 sm:px-8"
        style={{
          borderColor: scrolled ? "rgba(124, 58, 237, 0.22)" : "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(14px)",
        }}
      >
        <div className="flex items-center gap-4">
          <Logo label={t("nav.home")} />
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {[
            ["#about", t("about.title")],
            ["#skills", t("skills.title")],
            ["#projects", t("projects.title")],
            ["#experience", t("experience.title")],
            ["#education", t("education.title")],
            ["#contact", t("contact.title")],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className={`nav-link relative inline-block text-sm font-medium text-[var(--text-secondary)] transition-colors duration-300 ${
                active === href ? "text-[var(--text-main)]" : ""
              }`}
              aria-current={active === href ? "page" : undefined}
            >
              <span className="nav-link-inner">{label}</span>
              <span
                className={`nav-underline absolute left-0 right-0 bottom-[-8px] h-[2px] bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] transition-all duration-300 ${
                  active === href ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                } origin-left`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageToggle label={t("nav.changeLang")} />
          <button
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-md hover:bg-white/5"
            onClick={() => setMobileOpen((s) => !s)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 z-50 flex justify-center">
          <div className="w-[94%] max-w-[900px] rounded-2xl backdrop-blur-md bg-white/6 border border-white/6 p-4">
            <div className="flex flex-col gap-3">
              {[
                ["#about", t("about.title")],
                ["#skills", t("skills.title")],
                ["#projects", t("projects.title")],
                ["#experience", t("experience.title")],
                ["#education", t("education.title")],
                ["#contact", t("contact.title")],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="block py-3 px-4 rounded-md text-[var(--text-main)] font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
}
