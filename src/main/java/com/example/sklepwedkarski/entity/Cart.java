package com.example.sklepwedkarski.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "koszyk")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "uzytkownik_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "stanowisko_id", nullable = true)
    private FishingStand fishingStand;

    @Column(name = "godzina_start", nullable = true)
    private String startTime;

    @Column(name = "godzina_koniec", nullable = true)
    private String endTime;

    @Column(name = "data_rezerwacji", nullable = true)
    private LocalDate reservationDate;

    public Cart() {
    }

    public Cart(User user) {
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }
    public String getEndTime() { return endTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }
        public FishingStand getFishingStand() { return fishingStand; }
    public void setFishingStand(FishingStand fishingStand) { this.fishingStand = fishingStand; }

    @Override
    public String toString() {
        return "Cart{" +
                "id=" + id +
                ", user=" + user +
                '}';
    }

    public LocalDate getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDate reservationDate) {
        this.reservationDate = reservationDate;
    }
}
