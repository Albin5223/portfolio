import { useEffect, useState } from "react";
import { getSchoolProjects, getPersonalProjects } from "../services/api";
import Modal from "@mui/material/Modal";

interface Project {
  id: number;
  title: string;
  description: string;
  githubUrl: string;
  isPersonal: boolean;
}

export default function ProjectList() {
  const [personalProjects, setPersonalProjects] = useState<Project[]>([]);
  const [schoolProjects, setSchoolProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);


  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const schoolData = await getSchoolProjects();
        const personalData = await getPersonalProjects();
        if (!mounted) return;
        setSchoolProjects(Array.isArray(schoolData) ? schoolData : []);
        setPersonalProjects(Array.isArray(personalData) ? personalData : []);
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

      {!loading && !error && schoolProjects.length === 0 && (
        <p>Aucun projet disponible pour le moment.</p>
      )}

      {!loading && !error && schoolProjects.length > 0 && (
        <div className="projects-grid" aria-live="polite">
          {schoolProjects.map((project) => (
            <article 
              className="project-card" 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              style={{ cursor: "pointer" }}>
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
      {loading && <p>Chargement des projets…</p>}

      {!loading && !error && personalProjects.length === 0 && (
        <p>Aucun projet disponible pour le moment.</p>
      )}

      {!loading && !error && personalProjects.length > 0 && (
        <div className="projects-grid" aria-live="polite">
          {personalProjects.map((project) => (
            <article 
              className="project-card" 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              style={{ cursor: "pointer" }}>
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
      {selectedProject && fenetre(selectedProject, () => setSelectedProject(null))}
    </section>

  );
}


function fenetre (project: Project, onClose: () => void ) {
  return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>

          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer">
              Voir sur GitHub
            </a>
          )}

          <p>
            <button className="close-btn" onClick={onClose}>Fermer</button>
          </p>
        </div>
      </div>
    );
  }
