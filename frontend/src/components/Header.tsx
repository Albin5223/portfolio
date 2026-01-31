import { useEffect, useRef, useState } from "react";
import "../header.css";
import { useI18n } from "../i18n";
import frFlag from "../assets/flag-fr.svg";
import ukFlag from "../assets/flag-uk.svg";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const menuOpenRef = useRef(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const { t, lang, toggleLang } = useI18n();

  const navItems = [
    { id: "home", label: t("header.nav.home") },
    { id: "projects", label: t("header.nav.projects") },
    { id: "experiences", label: t("header.nav.experiences") },
    { id: "formation", label: t("header.nav.formation") },
    { id: "contact", label: t("header.nav.contact") },
  ];

  useEffect(() => {
    lastY.current = window.scrollY || window.pageYOffset || 0;

    const onScroll = () => {
      if (menuOpenRef.current) return;

      const currentY = window.scrollY || window.pageYOffset || 0;
      const delta = currentY - lastY.current;

      const THRESHOLD = 200;
      if (Math.abs(delta) < THRESHOLD) return;

      if (currentY > lastY.current) {
        setHidden(true);
      } else if (currentY < lastY.current) {
        setHidden(false);
      }

      lastY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) setHidden(false);
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (drawerRef.current?.contains(target)) return;
      if (menuButtonRef.current?.contains(target)) return;
      setMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${hidden ? "site-header--hidden" : ""}`}>
      <div className="site-header-inner">
        <a className="brand" href="#home">
          <span className="brand-text">
            <span className="brand-name">Paris Albin</span>
            <span className="brand-role">{t("header.brandRole")}</span>
          </span>
        </a>
        <div className="site-header-actions">
          <nav aria-label={t("header.navMenuLabel")}
          >
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="language-toggle"
            onClick={toggleLang}
            aria-label={`${t("header.languageSwitch")} (${lang === "fr" ? t("header.languageEnglish") : t("header.languageFrench")})`}
          >
            {lang === "fr" ? "FR" : "EN"}
            <img
              src={lang === "fr" ? frFlag : ukFlag}
              alt={lang === "fr" ? t("header.languageFrench") : t("header.languageEnglish")}
              className="language-flag"
              loading="lazy"
            />
          </button>

          <button
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? t("header.menuClose") : t("header.menuOpen")}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
            ref={menuButtonRef}
          >
            <span className="bar" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={`nav-drawer-backdrop ${menuOpen ? "open" : ""}`} onClick={closeMenu} />
      <div
        className={`nav-drawer ${menuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={t("header.navMenuLabel")}
        ref={drawerRef}
      >
        <nav aria-label={t("header.navMenuLabel")}>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={closeMenu}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="site-header-glow" aria-hidden="true" />
    </header>
  );
}
