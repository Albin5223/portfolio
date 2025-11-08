import ProjectList from "./Projects";

export default function Home() {
  return (
    <main>
      <section style={{ padding: "1rem 0" }}>
        <h2>Bienvenue</h2>
        <p>Bienvenue sur mon portfolio. Tu peux consulter mes projets, expériences et ma formation via le menu.</p>
      </section>

      <section style={{ padding: "1rem 0" }}>
        <h2>Quelques projets</h2>
        <ProjectList />
      </section>
    </main>
  );
}
