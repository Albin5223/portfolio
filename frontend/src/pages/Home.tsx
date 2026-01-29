import "./home.css";
import { useI18n } from "../i18n";

export default function Home() {
  const { t } = useI18n();

  return (
    <main className="home">
      <section className="hero">
        <div className="hero-text">
          <p className="hero-eyebrow">{t("home.eyebrow")}</p>
          <h1 className="hero-title">{t("home.title")}</h1>
          <p className="hero-lede">{t("home.lede")}</p>
          <p className="hero-body">{t("home.body")}</p>


          <div className="hero-actions">
            <a className="hero-btn primary" href="#projects">
              {t("home.ctaProjects")}
            </a>
            <a className="hero-btn ghost" href="#contact">
              {t("home.ctaContact")}
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <img src="/ma-photo.jpg" alt={t("home.imageAlt")} />
        </div>
      </section>
    </main>
  );
}
