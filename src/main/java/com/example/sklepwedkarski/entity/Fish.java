package com.example.sklepwedkarski.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "ryba")
public class Fish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nazwa")
    private String name;

    @Column(name = "ryba_url")
    private String fishUrl;

    @ManyToMany(mappedBy = "fish")
    @JsonIgnoreProperties("fish") // <-- Tells Jackson to ignore the fish list inside Fishery when accessing via Fish
    private List<Fishery> fisheries;   

    public Fish() {
    }

    public Fish(String name, String fishUrl) {
        this.name = name;
        this.fishUrl = fishUrl;
    }

    public List<Fishery> getFisheries() {
        return fisheries;
    }

    public void setFisheries(List<Fishery> fisheries) {
        this.fisheries = fisheries;
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

    public String getFishUrl() {
        return fishUrl;
    }

    public void setFishUrl(String fishUrl) {
        this.fishUrl = fishUrl;
    }

    @Override
    public String toString() {
        return "Fish{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", fishUrl='" + fishUrl + '\'' +
                '}';
    }
}
