package com.example.sklepwedkarski.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "zamowienie")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "uzytkownik_id")
    @com.fasterxml.jackson.annotation.JsonIdentityInfo(
        generator = com.fasterxml.jackson.annotation.ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
    )
    private User user;

    @ManyToOne
    @JoinColumn(name = "stanowisko_id", nullable = true)
    private FishingStand fishingStand;

    @Column(name = "data_zamowienia")
    private LocalDateTime orderDate;

    private String status;

    @Column(name = "suma_zamowienia")
    private BigDecimal totalAmount;

    @Column(name = "data_rezerwacji", nullable = true)
    private LocalDate reservationDate;

    @Column(name = "godzina_start", nullable = true)
    private String startTime;

    @Column(name = "godzina_koniec", nullable = true)
    private String endTime;

    public Order() {}

    // Gettery i Settery dla wszystkich pól...
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public FishingStand getFishingStand() { return fishingStand; }
    public void setFishingStand(FishingStand fishingStand) { this.fishingStand = fishingStand; }
    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    public LocalDate getReservationDate() { return reservationDate; }
    public void setReservationDate(LocalDate reservationDate) { this.reservationDate = reservationDate; }
    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }
    public String getEndTime() { return endTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }
}