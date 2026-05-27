package com.example.sklepwedkarski.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "lowisko")
public class Fishery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nazwa")
    private String name;

    @Column(name = "opis")
    private String description;

    @Column(name = "lowisko_url")
    private String fisheryUrl;

    public Fishery() {
    }

    public Fishery(String name, String description, String fisheryUrl) {
        this.name = name;
        this.description = description;
        this.fisheryUrl = fisheryUrl;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFisheryUrl() {
        return fisheryUrl;
    }

    public void setFisheryUrl(String fisheryUrl) {
        this.fisheryUrl = fisheryUrl;
    }

    @Override
    public String toString() {
        return "Fishery{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", fisheryUrl='" + fisheryUrl + '\'' +
                '}';
    }
}
