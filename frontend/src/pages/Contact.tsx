import "./contact.css";
import { useEffect, useState } from "react";
import { getContact } from "../services/api";

const contactLinks = [
  {
    label: "Email",
    value: "paris.albin23@gmail.com",
    href: "mailto:paris.albin23@gmail.com",
    detail: "Je réponds en général sous 24h.",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/albin-paris",
    href: "https://www.linkedin.com/in/albin-paris-23ab5b234/",
    detail: "Actualités, veille et réseau pro.",
  },
  {
    label: "GitHub",
    value: "github.com/Albin5223",
    href: "https://github.com/Albin5223",
    detail: "Projets open source et expérimentations.",
  },
];

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
            setError("Impossible de récupérer les formations.");
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
          <a className="contact-btn primary" href="/cv.pdf" download>
            Télécharger mon CV
          </a>
          <a className="contact-btn ghost" href="mailto:paris.albin23@gmail.com">
            Écrire un email
          </a>
        </div>

        <div className="contact-grid">
          {contact.map((item) => (
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
