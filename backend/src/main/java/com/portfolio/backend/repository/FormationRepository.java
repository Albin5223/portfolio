package com.portfolio.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.backend.table.Formation;

public interface FormationRepository extends JpaRepository<Formation, Long>{}
