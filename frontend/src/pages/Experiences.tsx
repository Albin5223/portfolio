import { useEffect, useRef, useState } from "react";
import "./experiences.css";
import { getExperiences } from "../services/api";
import { useI18n } from "../i18n";
import WorkIcon from "@mui/icons-material/Work";

export type Experience = {
  id: number;
  startDate: string | Date | null;
  endDate: string | Date | null;
  entreprise: string;
  intitule: string;
  missions: string[];
};

export default function Experiences() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleMap, setVisibleMap] = useState<Record<number, boolean>>({});
  const cardRefs = useRef<Record<number, HTMLElement | null>>({});
  const { t, lang } = useI18n();

  // Fetch data
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getExperiences(lang);
        if (!mounted) return;
        if (!Array.isArray(data) || data.length === 0) {
          setItems([]);
          return;
        }
        const normalized: Experience[] = data
          .map((exp: any) => ({
            id: exp.id ?? exp._id,
            startDate: exp.startDate ? new Date(exp.startDate) : null,
            endDate: exp.endDate ? new Date(exp.endDate) : null,
            entreprise: exp.entreprise ?? exp.company ?? "",
            intitule: exp.intitule ?? exp.title ?? "Expérience",
            missions: Array.isArray(exp.missions)
              ? exp.missions.filter((m: any) => m != null).map((m: any) => String(m))
              : exp.missions
              ? [String(exp.missions)]
              : [],
          }))
          .sort((a, b) => {
            const aDate = a.endDate ? new Date(a.endDate).getTime() : Infinity;
            const bDate = b.endDate ? new Date(b.endDate).getTime() : Infinity;
            return bDate - aDate;
          });
        setItems(normalized);
      } catch (e) {
        console.error(e);
        if (!mounted) return;
        setError(t("experiences.error"));
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [lang]);

  // IntersectionObserver — même logique que Formation
  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const targetId = Number((entry.target as HTMLElement).dataset.id);
          if (entry.isIntersecting && targetId) {
            setVisibleMap((prev) =>
              prev[targetId] ? prev : { ...prev, [targetId]: true }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.28 }
    );

    Object.entries(cardRefs.current).forEach(([id, el]) => {
      if (el) {
        el.dataset.id = id;
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  return (
    <section id="experiences" className="formation">
      <div className="formation-inner">
        <header className="formation-header">
          <p className="formation-kicker">{t("experiences.kicker")}</p>
          <h2 className="formation-title">{t("experiences.title")}</h2>
        </header>

        {loading && (
          <p className="formation-status">{t("experiences.loading")}</p>
        )}

        {error && (
          <div className="formation-error" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="formation-empty">{t("experiences.empty")}</p>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="formation-timeline">
            {items.map((item, index) => (
              <ExperienceCard
                key={item.id}
                experience={item}
                index={index}
                isVisible={Boolean(visibleMap[item.id])}
                lang={lang}
                setRef={(el) => {
                  cardRefs.current[item.id] = el;
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  index,
  isVisible,
  lang,
  setRef,
}: {
  experience: Experience;
  index: number;
  isVisible: boolean;
  lang: string;
  setRef: (el: HTMLElement | null) => void;
}) {
  return (
    <article
      ref={setRef}
      className={`formation-card timeline-card ${
        index % 2 === 0 ? "is-left" : "is-right"
      } ${isVisible ? "is-visible" : ""}`}
    >
      <div className="formation-card-top">
        <div className="formation-icon-wrap">
          <WorkIcon fontSize="small" />
        </div>
        <div className="formation-meta">
          <p className="formation-card-title">{experience.intitule}</p>
          <p className="formation-dates">
            {renderPeriod(experience.startDate, experience.endDate, "", lang)}
          </p>
        </div>
      </div>
      <h3 className="formation-card-etablissement">{experience.entreprise}</h3>
      {experience.missions.length > 0 && (
        <ul className="missions-list">
          {experience.missions.map((m, i) => (
            <li key={i} className="formation-card-desc">
              {m}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function formatDate(d: string | Date | null, locale: string) {
  if (!d) return "";
  const dateObj = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(dateObj.getTime())) return "";
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "fr-FR", {
    month: "long",
    year: "numeric",
  }).format(dateObj);
}

function renderPeriod(
  start: string | Date | null,
  end: string | Date | null,
  fallback: string,
  locale: string
) {
  const startText = formatDate(start, locale);
  const endText = formatDate(end, locale);
  return startText && endText
    ? `${startText} — ${endText}`
    : startText || endText || fallback;
}