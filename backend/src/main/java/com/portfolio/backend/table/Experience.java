package com.portfolio.backend.table;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Experience {
    @Id
    private Long id;

    private Date startDate;
    private Date endDate;
    private String intitule;
    @ElementCollection
    private List<String> missions;
    private String entreprise;

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}
    public Date getStartDate() {return startDate;}
    public void setStartDate(Date startDate) {this.startDate = startDate;}
    public Date getEndDate() {return endDate;}
    public void setEndDate(Date endDate) {this.endDate = endDate;}
    public String getIntitule() {return intitule;}
    public void setIntitule(String intitule) {this.intitule = intitule;}
    public List<String> getMissions() {return missions;}
    public void setMissions(List<String> missions) {this.missions = missions;}
    public String getEntreprise() {return entreprise;}
    public void setEntreprise(String entreprise) {this.entreprise = entreprise;}
}