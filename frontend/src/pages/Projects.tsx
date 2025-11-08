import { useEffect, useState } from "react";
import { getProjects } from "../services/api";

interface Project {
  id: number;
  title: string;
  description: string;
  githubUrl: string;
}

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProjects();
        if (!mounted) return;
        setProjects(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        if (!mounted) return;
        setError("Impossible de récupérer les projets.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="card">
      <h2>Mes projets universitaires</h2>

      {loading && <p>Chargement des projets…</p>}

      {error && (
        <div role="alert" style={{ color: "#f88" }}>
          {error}
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <p>Aucun projet disponible pour le moment.</p>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="projects-grid" aria-live="polite">
          {projects.map((project) => (
            <article className="project-card" key={project.id}>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-actions">
                {project.githubUrl && (
                  <a
                    className="project-link"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Voir sur GitHub
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <h2>Mes projets personnels</h2>
    </section>

  );
}
