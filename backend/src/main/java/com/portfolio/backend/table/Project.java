package com.portfolio.backend.table;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Project {
    
    @Id 
    @GeneratedValue
    private Long id;

    private String title;
    private String description;
    private String githubUrl;
    private boolean isPersonal;

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
    public boolean isPersonal() { return isPersonal; }
    public void setPersonal(boolean isPersonal) { this.isPersonal = isPersonal; }
}
