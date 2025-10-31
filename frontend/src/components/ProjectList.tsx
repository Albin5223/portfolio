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

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  return (
    <div>
      <h2>Mes projets</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
