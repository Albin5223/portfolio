import "./contact.css";
import { useEffect, useState } from "react";
import BlockIcon from "@mui/icons-material/Block";
import { getContact } from "../services/api";

interface Contact {
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
  
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getContact();
        if (!mounted) return;
        setContact(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        if (!mounted) return;
        setError("Impossible de récupérer les contacts.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);
    
  return (
    <section className="contact">
      <div className="contact-inner">
        <header className="contact-header">
          <p className="contact-kicker">Contact</p>
          <h1 className="contact-title">Restons en contact</h1>
          <p className="contact-lede">
            Une opportunité, un projet ou simplement l'envie d'échanger ? Je suis disponible
            pour discuter de vos besoins et réfléchir ensemble à la meilleure façon d'y répondre.
          </p>
        </header>

        <div className="contact-actions">
          <button
            type="button"
            className="contact-btn primary is-disabled"
            disabled
            aria-disabled="true"
            title="CV bientôt disponible"
          >
            <BlockIcon fontSize="small" aria-hidden />
            CV bientôt disponible
          </button>
          <a className="contact-btn ghost" href="mailto:paris.albin23@gmail.com">
            Écrire un email
          </a>
        </div>

        <div className="contact-grid">
          {loading && (
            <p className="contact-state" role="status">
              Chargement des contacts...
            </p>
          )}

          {error && (
            <p className="contact-state error" role="alert">
              {error}
            </p>
          )}

          {!loading && !error && contact.length === 0 && (
            <p className="contact-state" role="status">
              Aucun contact disponible pour le moment.
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
          <p className="contact-note-title">Disponibilité</p>
          <p className="contact-note-body">
            Basé à Paris, mobile en Île-de-France et ouvert au télétravail. Réponse assurée sous 24h.
          </p>
        </div>
      </div>
    </section>
  );
}
