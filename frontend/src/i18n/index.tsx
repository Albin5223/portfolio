import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "./translations";
import type { Locale, TranslationKey } from "./translations";

type I18nContextValue = {
  lang: Locale;
  setLang: (locale: Locale) => void;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);
const STORAGE_KEY = "portfolio-language";

function translate(lang: Locale, key: TranslationKey): string {
  const dictionary = translations[lang] ?? translations.fr;
  const fallback = translations.fr;
  const segments = key.split(".");

  const resolve = (source: any) =>
    segments.reduce((acc: any, segment: string) => (acc && typeof acc === "object" ? acc[segment] : undefined), source);

  const value = resolve(dictionary) ?? resolve(fallback);
  return typeof value === "string" ? value : key;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "fr";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "en" ? "en" : "fr";
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      console.warn("Unable to persist language", e);
    }
  }, [lang]);

  const setLang = useCallback((locale: Locale) => setLangState(locale), []);
  const toggleLang = useCallback(() => setLangState((prev) => (prev === "fr" ? "en" : "fr")), []);
  const t = useMemo(() => (key: TranslationKey) => translate(lang, key), [lang]);

  const value = useMemo(() => ({ lang, setLang, toggleLang, t }), [lang, setLang, toggleLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider");
  return ctx;
}
