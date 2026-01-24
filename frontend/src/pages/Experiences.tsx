
import { useEffect, useState } from "react";
import "./experiences.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { getExperiences } from "../services/api";

type Experience = {
  id?: number;
  poste: string;
  entreprise: string;
  periode: string;
  description: string;
};

export default function Experiences() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        const normalized: Experience[] = data.map((exp: any) => ({
          id: exp.id ?? exp._id,
          poste: exp.poste ?? exp.title ?? "Poste",
          entreprise: exp.entreprise ?? exp.company ?? "Entreprise",
          periode: exp.periode ?? exp.period ?? "Période non renseignée",
          description: exp.description ?? "",
        }));
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
            <Swiper
              modules={[Pagination]}
              centeredSlides
              spaceBetween={18}
              slidesPerView={1.1}
              grabCursor
              pagination={{ type: "progressbar", clickable: false }}
              className="experiences-swiper"
            >
              {experiences.map((exp, idx) => (
                <SwiperSlide key={exp.id ?? idx} className="experience-slide">
                  <article className="experience-card">
                    <div className="experience-top">
                      <div className="experience-badge">{exp.periode}</div>
                      <h4 className="experience-title">{exp.poste}</h4>
                      <p className="experience-desc">{exp.entreprise}</p>
                    </div>
                    <p className="experience-body">{exp.description}</p>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}
