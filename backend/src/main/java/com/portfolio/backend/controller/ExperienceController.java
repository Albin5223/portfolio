package com.portfolio.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.backend.repository.ExperienceRepository;
import com.portfolio.backend.table.Experience;

@RestController
@RequestMapping("/api/experiences")
@CrossOrigin(origins = "*")
public class ExperienceController {
    

    private final ExperienceRepository repo;

    public ExperienceController(ExperienceRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/all")
    public List<Experience> getAllExperiences() {
        return repo.findAll();
    } 
}
