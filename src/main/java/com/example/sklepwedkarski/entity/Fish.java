package com.example.sklepwedkarski.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

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
    @JsonBackReference
    private List<Fishery> fisheries = new ArrayList<>();

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
