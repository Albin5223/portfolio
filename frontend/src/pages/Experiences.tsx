
import { useEffect, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import "./experiences.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { getExperiences } from "../services/api";

type Experience = {
  id: number;
  startDate: string | Date | null;
  endDate: string | Date | null;
  intitule: string;
  description: string;
};

export default function Experiences() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [swiperRef, setSwiperRef] = useState<SwiperInstance | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getExperiences();
        if (!Array.isArray(data) || data.length === 0) {
          setItems([]);
          return;
        }
        const normalized: Experience[] = data
          .map((exp: any) => ({
            id: exp.id ?? exp._id,
            startDate: exp.startDate ? new Date(exp.startDate) : null,
            endDate: exp.endDate ? new Date(exp.endDate) : null,
            intitule: exp.intitule ?? exp.title ?? "Expérience",
            description: exp.description ?? "",
          }))
          .sort((a, b) => {
            const aDate = a.endDate ? new Date(a.endDate).getTime() : 0;
            const bDate = b.endDate ? new Date(b.endDate).getTime() : 0;
            return bDate - aDate;
          });
        setItems(normalized);
      } catch (e) {
        console.error(e);
        setError("Impossible de récupérer les expériences.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const experiences = items.length > 0 ? items : [];

  const handlePrev = () => swiperRef?.slidePrev();
  const handleNext = () => swiperRef?.slideNext();

  return (
    <section id="experiences" className="experiences">
      <div className="experiences-inner">
        <header className="experiences-header">
          <p className="experiences-kicker">PARCOURS</p>
          <h2 className="experiences-title">Expériences</h2>
          <h4 className="experiences-lede">
            Découvrez mes expériences professionnelles variées !
          </h4>
        </header>

        {loading && <p className="experiences-status">Chargement des expériences...</p>}

        {error && !loading && (
          <p className="experiences-error" role="alert">{error}</p>
        )}

        {!loading && !error && experiences.length === 0 && (
          <p className="experiences-empty">Aucune expérience pour le moment.</p>
        )}

        {!loading && !error && experiences.length > 0 && (
          <div className="experiences-viewport">
            <div className="experiences-progress swiper-pagination" />
            <Swiper
              modules={[Pagination]}
              centeredSlides
              spaceBetween={18}
              slidesPerView={1.1}
              grabCursor
              onSwiper={setSwiperRef}
              pagination={{ type: "progressbar", el: ".experiences-progress", clickable: false }}
              className="experiences-swiper"
            >
              {experiences.map((exp, idx) => (
                <SwiperSlide key={exp.id ?? idx} className="experience-slide">
                  <article className="experience-card">
                    <div className="experience-top">
                      <div className="experience-badge">{renderPeriod(exp.startDate, exp.endDate)}</div>
                      <h4 className="experience-title">{exp.intitule}</h4>
                    </div>
                    <p className="experience-body">{exp.description}</p>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="experiences-arrows">
              <button type="button" className="experience-cta" onClick={handlePrev} disabled={!swiperRef}>
                ← Précédent
              </button>
              <button type="button" className="experience-cta" onClick={handleNext} disabled={!swiperRef}>
                Suivant →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function formatDate(d: string | Date | null) {
  if (!d) return "";
  const dateObj = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(dateObj.getTime())) return "";
  return new Intl.DateTimeFormat("fr-FR", { month: "short", year: "numeric" }).format(dateObj);
}

function renderPeriod(start: string | Date | null, end: string | Date | null) {
  const startText = formatDate(start);
  const endText = formatDate(end);
  return startText && endText ? `${startText} — ${endText}` : startText || endText || "Période";
}
