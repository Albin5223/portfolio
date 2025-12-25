import "./home.css";

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-text">
          <p className="hero-eyebrow">Qui suis-je ?</p>
          <h1 className="hero-title">Paris Albin</h1>
          <p className="hero-lede">
            
          </p>
          <p className="hero-body">
          Chef de projet en alternance et étudiant en master de développement informatique, 
          je reste proche du code et des enjeux techniques, de la conception à l'amélioration des applications.
          </p>


          <div className="hero-actions">
            <a className="hero-btn primary" href="#projects">
              Voir mes projets
            </a>
            <a className="hero-btn ghost" href="#contact">
              Me contacter
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <img src="/ma-photo.jpg" alt="Bannière" />
        </div>
      </section>
    </main>
  );
}
