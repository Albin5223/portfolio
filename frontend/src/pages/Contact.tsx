import "./contact.css";
import { useEffect, useState } from "react";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { getContact } from "../services/api";
import { useI18n } from "../i18n";

export interface Contact {
  id: number;
  label: string;
  value: string;
  href: string;
  detail: string;
}

export default function Contact() {
  const [contact, setContact] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, lang } = useI18n();
  
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getContact(lang);
        if (!mounted) return;
        setContact(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        if (!mounted) return;
        setError(t("contact.error"));
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [lang]);
    
  return (
    <section className="contact">
      <div className="contact-inner">
        <header className="contact-header">
          <p className="contact-kicker">{t("contact.kicker")}</p>
          <h1 className="contact-title">{t("contact.title")}</h1>
          <p className="contact-lede">{t("contact.lede")}</p>
        </header>

        <div className="contact-actions">
          <a
            className="contact-btn primary"
            href="/CV_Albin_Paris.pdf"
            download="CV_Albin_Paris.pdf"
            title={t("contact.downloadCv")}
          >
            <DownloadRoundedIcon fontSize="small" aria-hidden />
            {t("contact.downloadCv")}
          </a>
          <a className="contact-btn ghost" href="mailto:paris.albin23@gmail.com">
            {t("contact.emailCta")}
          </a>
        </div>

        <div className="contact-grid">
          {loading && (
            <p className="contact-state" role="status">
              {t("contact.loading")}
            </p>
          )}

          {error && (
            <p className="contact-state error" role="alert">
              {error}
            </p>
          )}

          {!loading && !error && contact.length === 0 && (
            <p className="contact-state" role="status">
              {t("contact.empty")}
            </p>
          )}

          {!loading && !error &&
            contact.map((item) => (
              <a className="contact-card" key={item.label} href={item.href} target="_blank" rel="noreferrer">
                <div className="contact-card-head">
                  <span className="contact-pill">{item.label}</span>
                  <span className="contact-arrow" aria-hidden="true">
                    →
                  </span>
                </div>
                <p className="contact-value">{item.value}</p>
                <p className="contact-detail">{item.detail}</p>
              </a>
            ))}
        </div>

        <div className="contact-note">
          <p className="contact-note-title">{t("contact.noteTitle")}</p>
          <p className="contact-note-body">{t("contact.noteBody")}</p>
        </div>
      </div>
    </section>
  );
}
