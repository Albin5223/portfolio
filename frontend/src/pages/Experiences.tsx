
import { useEffect, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import "./experiences.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { getExperiences } from "../services/api";
import { useI18n } from "../i18n";

type Experience = {
  id: number;
  startDate: string | Date | null;
  endDate: string | Date | null;
  entreprise: string;
  intitule: string;
  missions: string[];
};

export default function Experiences() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [swiperRef, setSwiperRef] = useState<SwiperInstance | null>(null);
  const { t, lang } = useI18n();

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
            entreprise: exp.entreprise ?? exp.company ?? "",
            intitule: exp.intitule ?? exp.title ?? "Expérience",
            missions: Array.isArray(exp.missions)
              ? exp.missions.filter((m: any) => m != null).map((m: any) => String(m))
              : exp.missions
              ? [String(exp.missions)]
              : [],
          }))
          .sort((a, b) => {
            const aDate = a.endDate ? new Date(a.endDate).getTime() : 0;
            const bDate = b.endDate ? new Date(b.endDate).getTime() : 0;
            return bDate - aDate;
          });
        setItems(normalized);
      } catch (e) {
        console.error(e);
        setError(t("experiences.error"));
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
          <p className="experiences-kicker">{t("experiences.kicker")}</p>
          <h2 className="experiences-title">{t("experiences.title")}</h2>
          <h4 className="experiences-lede">{t("experiences.lede")}</h4>
        </header>

        {loading && <p className="experiences-status">{t("experiences.loading")}</p>}

        {error && !loading && (
          <p className="experiences-error" role="alert">{error}</p>
        )}

        {!loading && !error && experiences.length === 0 && (
          <p className="experiences-empty">{t("experiences.empty")}</p>
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
                      <div className="experience-badge">{renderPeriod(exp.startDate, exp.endDate, t("experiences.periodFallback"), lang)}</div>
                      <h4 className="experience-title">{exp.intitule}</h4>
                      {exp.entreprise && <p className="experience-company">{exp.entreprise}</p>}
                    </div>
                    {exp.missions.length > 0 && (
                      <div className="experience-missions">
                        <p className="experience-label">{t("experiences.missionsLabel")}</p>
                        <ul className="experience-list">
                          {exp.missions.map((mission, missionIdx) => (
                            <li key={missionIdx}>{mission}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="experiences-arrows">
              <button type="button" className="experience-cta" onClick={handlePrev} disabled={!swiperRef}>
                {t("experiences.previous")}
              </button>
              <button type="button" className="experience-cta" onClick={handleNext} disabled={!swiperRef}>
                {t("experiences.next")}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function formatDate(d: string | Date | null, locale: string) {
  if (!d) return "";
  const dateObj = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(dateObj.getTime())) return "";
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "fr-FR", { month: "short", year: "numeric" }).format(dateObj);
}

function renderPeriod(start: string | Date | null, end: string | Date | null, fallback: string, locale: string) {
  const startText = formatDate(start, locale);
  const endText = formatDate(end, locale);
  return startText && endText ? `${startText} — ${endText}` : startText || endText || fallback;
}
