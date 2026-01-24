import { useEffect, useState } from "react";
import { getSchoolProjects, getPersonalProjects } from "../services/api";
import "./projects.css";

interface Project {
  id: number;
  title: string;
  description: string;
  githubUrl: string;
  personal: boolean;
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
    <section id="projects" className="projects">
      <div className="projects-inner">
        <header className="projects-header">
          <p className="projects-kicker">Selection</p>
          <h2 className="projects-title">Projets et realisations</h2>
          <h4 className="projects-lede">
            Une selection recente de projets menees en contexte universitaire et personnel.
          </h4>
        </header>

        {loading && <p className="projects-status">Chargement des projets...</p>}

        {error && (
          <div className="projects-error" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="projects-groups">
            <ProjectsGroup
              title="Projets universitaires"
              projects={schoolProjects}
              emptyLabel="Aucun projet universitaire pour le moment."
              onSelect={setSelectedProject}
            />
            <ProjectsGroup
              title="Projets personnels"
              projects={personalProjects}
              emptyLabel="Aucun projet personnel pour le moment."
              onSelect={setSelectedProject}
            />
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}

function ProjectsGroup({
  title,
  projects,
  emptyLabel,
  onSelect,
}: {
  title: string;
  projects: Project[];
  emptyLabel: string;
  onSelect: (p: Project) => void;
}) {
  const hasProjects = projects.length > 0;

  return (
    <div className="projects-group">
      <div className="projects-group-head">
        <h3>{title}</h3>
        <span className="projects-count">{projects.length} projet(s)</span>
      </div>

      {!hasProjects && <p className="projects-empty">{emptyLabel}</p>}

      {hasProjects && (
        <div className="projects-grid" aria-live="polite">
          {projects.map((project) => (
            <article
              className="project-card"
              key={project.id}
              onClick={() => onSelect(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onSelect(project);
                }
              }}
            >
              <div className="project-top">
                <div className="project-badge">{project.personal ? "Personnel" : "Universitaire"}</div>
                <h4 className="project-title">{project.title}</h4>
                <p className="project-desc">{project.description}</p>
              </div>
              <div className="project-actions">
                {project.githubUrl && (
                  <a
                    className="project-link"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Voir sur GitHub
                  </a>
                )}
                <button className="project-cta" type="button">
                  Details
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="projects-modal-overlay" onClick={onClose}>
      <div className="projects-modal" onClick={(e) => e.stopPropagation()}>
        <div className="projects-modal-head">
          <div className="project-badge">{project.personal ? "Personnel" : "Universitaire"}</div>
          <h3>{project.title}</h3>
        </div>
        <p className="projects-modal-body">{project.description}</p>

        {true &&(
          <div className="projects-modal-tech">
            <h4>Technologies utilisees :</h4>
            <div className="hero-pills">
              <span className="hero-pill">React + TypeScript</span>
              <span className="hero-pill">Java / Spring Boot</span>
              <span className="hero-pill">API REST</span>
              <span className="hero-pill">CI/CD & Docker</span>
            </div>
          </div>
        )}

        {project.githubUrl && (
          <a className="project-link" href={project.githubUrl} target="_blank" rel="noreferrer">
            Ouvrir sur GitHub
          </a>
        )}

        <div className="projects-modal-actions">
          <button className="project-cta" type="button" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
