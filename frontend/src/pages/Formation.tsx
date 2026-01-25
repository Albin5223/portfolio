import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import MusiqueIcon from "@mui/icons-material/MusicNote";
import { useEffect, useRef, useState } from "react";
import { getFormations } from "../services/api";
import "./formation.css";

interface Formation {
  id: number;
  title: string;
  dateStart: string | Date;
  dateEnd: string | Date;
  description: string;
  typeFormation: string;
}


export default function Formation() {
  const [formation, setFormation] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleMap, setVisibleMap] = useState<Record<number, boolean>>({});
  const cardRefs = useRef<Record<number, HTMLElement | null>>({});

  useEffect(() => {
      let mounted = true;
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await getFormations();
          if (!mounted) return;
          setFormation(Array.isArray(data) ? data : []);
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

  useEffect(() => {
    if (!formation.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const targetId = Number((entry.target as HTMLElement).dataset.id);
          if (entry.isIntersecting && targetId) {
            setVisibleMap((prev) => (prev[targetId] ? prev : { ...prev, [targetId]: true }));
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
  }, [formation]);

  return (
    <section id="formation" className="formation">
      <div className="formation-inner">
        <header className="formation-header">
          <p className="formation-kicker">Parcours</p>
          <h2 className="formation-title">Formations et diplomes</h2>
          <p className="formation-lede">
            Decouvrez mon parcours academique et les formations que j'ai suivies.
          </p>
        </header>

        {loading && <p className="formation-status">Chargement des formations...</p>}

        {error && (
          <div className="formation-error" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && formation.length === 0 && (
          <p className="formation-empty">Aucune formation disponible pour le moment.</p>
        )}

        {!loading && !error && formation.length > 0 && (
          <div className="formation-timeline">
            {formation.map((item, index) => (
              <FormationCard
                key={item.id}
                formation={item}
                index={index}
                isVisible={Boolean(visibleMap[item.id])}
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

function FormationCard({
  formation,
  index,
  isVisible,
  setRef,
}: {
  formation: Formation;
  index: number;
  isVisible: boolean;
  setRef: (el: HTMLElement | null) => void;
}) {
  return (
    <article
      ref={setRef}
      className={`formation-card timeline-card ${index % 2 === 0 ? "is-left" : "is-right"} ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="formation-card-top">
        <div className="formation-icon-wrap">{selectIcon(formation.typeFormation)}</div>
        <div className="formation-meta">
          <p className="formation-type">{formation.typeFormation || "Formation"}</p>
          <p className="formation-dates">
            {formatDate(formation.dateStart)} — {formatDate(formation.dateEnd)}
          </p>
        </div>
      </div>
      <h3 className="formation-card-title">{formation.title}</h3>
      <p className="formation-card-desc">{formation.description}</p>
    </article>
  );
}

function formatDate(d: string | Date) {
  if (!d) return "";
  const dateObj = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(dateObj.getTime())) return String(d);
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "long", year: "numeric" }).format(dateObj);
}

function selectIcon(typeFormation: string) {
  switch (typeFormation) {
    case "Informatique":
      return <LaptopMacIcon fontSize="small" />;
    case "Musique":
      return <MusiqueIcon fontSize="small" />;
    default:
      return <LaptopMacIcon fontSize="small" />;
  }
}