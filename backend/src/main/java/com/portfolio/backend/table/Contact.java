package com.portfolio.backend.table;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Contact {
    @Id 
    @GeneratedValue
    private Long id;
    private String label;
    @Column(name = "contact_value")
    private String value;
    private String href;
    private String detail;

    public Long getId() { return id; }
    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }
    public String getHref() { return href; }
    public void setHref(String href) { this.href = href; }
    public String getDetail() { return detail; }
    public void setDetail(String detail) { this.detail = detail; }
}
