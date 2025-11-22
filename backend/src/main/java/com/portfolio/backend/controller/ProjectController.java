package com.portfolio.backend.controller;

import com.portfolio.backend.table.Project;
import com.portfolio.backend.repository.ProjectRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    // Objet Repository pour interagir avec la base de données des projets
    private final ProjectRepository repo;

    public ProjectController(ProjectRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/all")
    public List<Project> getProjects() {
        return repo.findAll();
    }

    @GetMapping("/personal")
    public List<Project> getPersonalProjects() {
        return repo.findAll().stream()
                .filter(Project::isPersonal)
                .toList();
    }

    @GetMapping("/school")
    public List<Project> getSchoolProjects() {
        return repo.findAll().stream()
                .filter(project -> !project.isPersonal())
                .toList();
    }





    /*
     * Exemple de requête CURL pour ajouter un projet :
     * curl -X POST http://localhost:8080/api/projects \
        -H "Content-Type: application/json" \
        -d '{"title":"Portfolio","description":"Mon site perso","githubUrl":"https://github.com"}'

     */

    @PostMapping
    public Project addProject(@RequestBody Project project) {
        return repo.save(project);
    }
}