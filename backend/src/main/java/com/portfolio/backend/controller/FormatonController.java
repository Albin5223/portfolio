package com.portfolio.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.backend.repository.FormationRepository;
import com.portfolio.backend.table.Formation;

@RestController
@RequestMapping("/api/formations")
@CrossOrigin(origins = "*")
public class FormatonController {
    // Objet Repository pour interagir avec la base de données des projets
    private final FormationRepository repo;

    public FormatonController(FormationRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Formation> getFormations() {
        return repo.findAll();
    }   
}
