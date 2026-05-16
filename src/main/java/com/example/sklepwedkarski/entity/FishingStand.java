package com.example.sklepwedkarski.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "stanowisko")
@Getter @Setter @NoArgsConstructor
public class FishingStand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "lowisko_id")
    private Fishery fishery;

    @Column(name = "numer_stanowiska")
    private String standNumber;

    @Column(name = "czy_dostepne")
    private Boolean isAvailable;

    public FishingStand(Fishery fishery, String standNumber, Boolean isAvailable) {
        this.fishery = fishery;
        this.standNumber = standNumber;
        this.isAvailable = isAvailable;
    }

    @Override
    public String toString() {
        return "FishingStand{" +
                "id=" + id +
                ", fishery=" + fishery +
                ", standNumber='" + standNumber + '\'' +
                ", isAvailable=" + isAvailable +
                '}';
    }
}
