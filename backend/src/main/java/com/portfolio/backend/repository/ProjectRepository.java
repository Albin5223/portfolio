package com.portfolio.backend.repository;

import com.portfolio.backend.table.Project;
import org.springframework.data.jpa.repository.JpaRepository;


// Cette interface permet d'effectuer des opérations CRUD sur les entités Project dans la base de données.
// Elle étend JpaRepository, fournissant ainsi des méthodes prédéfinies pour gérer les projets.
// Le type de l'entité est Project et sa clé primaire est de type Long.
public interface ProjectRepository extends JpaRepository<Project, Long> {}