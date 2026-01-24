
import "./experiences.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const experiences = [
  {
    poste: "Développeur Web Junior",
    entreprise: "Tech Solutions",
    periode: "Janvier 2022 - Décembre 2022",
    description: "Développement et maintenance de sites web pour divers clients.",
  },
  {
    poste: "Serveur",
    entreprise: "Group ACCOR - Novotel",
    periode: "Juillet 2023 - Septembre 2023",
    description: "Service en salle et gestion des commandes pour les clients de l'hôtel.",
  },
  {
    poste: "Vendeur à domicile",
    entreprise: "Geninc",
    periode: "Juillet 2022 - Février 2023",
    description: "Promotion et vente de produits en porte-à-porte.",
  },
];

export default function Experiences() {
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
              <SwiperSlide key={idx} className="experience-slide">
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
      </div>
    </section>
  );
}
