import { useEffect, useState } from "react";
import { getSchoolProjects, getPersonalProjects } from "../services/api";
import "./projects.css";
import { useI18n } from "../i18n";

interface Project {
  id: number;
  title: string;
  description: string;
  githubUrl: string;
  personal: boolean;
  technologies: string[];
}

export default function ProjectList() {
  const [personalProjects, setPersonalProjects] = useState<Project[]>([]);
  const [schoolProjects, setSchoolProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t } = useI18n();

  // Prevent background scroll when a modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedProject]);

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
        setError(t("projects.error"));
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
          <p className="projects-kicker">{t("projects.kicker")}</p>
          <h2 className="projects-title">{t("projects.title")}</h2>
          <h4 className="projects-lede">{t("projects.lede")}</h4>
        </header>

        {loading && <p className="projects-status">{t("projects.loading")}</p>}

        {error && (
          <div className="projects-error" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="projects-groups">
            <ProjectsGroup
              title={t("projects.universityGroup")}
              projects={schoolProjects}
              emptyLabel={t("projects.emptyUniversity")}
              onSelect={setSelectedProject}
            />
            <ProjectsGroup
              title={t("projects.personalGroup")}
              projects={personalProjects}
              emptyLabel={t("projects.emptyPersonal")}
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
  const { t } = useI18n();

  return (
    <div className="projects-group">
      <div className="projects-group-head">
        <h3>{title}</h3>
        <span className="projects-count">{projects.length} {t("projects.countLabel")}</span>
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
                <div className="project-badge">{project.personal ? t("projects.badgePersonal") : t("projects.badgeSchool")}</div>
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
                    {t("projects.viewGithub")}
                  </a>
                )}
                <button className="project-cta" type="button">
                  {t("projects.details")}
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
  const { t } = useI18n();
  const hasTechnologies = Array.isArray(project.technologies) && project.technologies.length > 0;

  return (
    <div className="projects-modal-overlay" onClick={onClose}>
      <div
        className="projects-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <div className="projects-modal-accent" aria-hidden />
        <button className="projects-modal-close" type="button" onClick={onClose} aria-label="Fermer la fiche projet">
          X
        </button>

        <div className="projects-modal-head">
          <div className="projects-modal-title-wrap">
            <p className="projects-modal-kicker">{t("projects.modal.kicker")}</p>
            <h3 id="project-modal-title">{project.title}</h3>
          </div>
        </div>

        <p className="projects-modal-body">{project.description}</p>

        {hasTechnologies && (
          <div className="projects-modal-tech">
            <h4>{t("projects.modal.stack")}</h4>
            <div className="projects-pill-row">
              {project.technologies.map((tech, index) => (
                <span key={index} className="projects-pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="projects-modal-actions">
          {project.githubUrl && (
            <a className="project-cta project-cta--solid" href={project.githubUrl} target="_blank" rel="noreferrer">
              {t("projects.viewGithub")}
            </a>
          )}
          <button className="project-cta" type="button" onClick={onClose}>
            {t("projects.modal.close")}
          </button>
        </div>
      </div>
    </div>
  );
}
