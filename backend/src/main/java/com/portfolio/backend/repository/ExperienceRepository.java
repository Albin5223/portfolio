package com.portfolio.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.backend.table.Experience;
public interface ExperienceRepository extends JpaRepository<Experience, Long>{}