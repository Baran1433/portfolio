import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext(null);
const STORAGE_KEY = "portfolio-lang";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === "en" ? "en" : "tr";
    } catch {
      return "tr";
    }
  });

  const t = useMemo(() => {
    const dict = translations[lang];
    return (path) => {
      return path.split(".").reduce((acc, key) => acc?.[key], dict) ?? path;
    };
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === "tr" ? "en" : "tr"));

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = translations[lang].meta.title;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, toggleLang, t }), [lang, t]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
