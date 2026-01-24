package com.portfolio.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.portfolio.backend.table.Formation;

@Repository
public interface FormationRepository extends JpaRepository<Formation, Long>{}
