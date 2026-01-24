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
}