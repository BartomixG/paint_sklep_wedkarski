package com.example.sklepwedkarski.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "zamowienie")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "uzytkownik_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "stanowisko_id")
    private FishingStand fishingStand;

    @Column(name = "data_zamowienia")
    private LocalDateTime orderDate;

    private String status;

    @Column(name = "suma_zamowienia")
    private BigDecimal totalAmount;

    public Order() {
    }

    public Order(User user, FishingStand fishingStand, LocalDateTime orderDate, String status, BigDecimal totalAmount) {
        this.user = user;
        this.fishingStand = fishingStand;
        this.orderDate = orderDate;
        this.status = status;
        this.totalAmount = totalAmount;
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

    public FishingStand getFishingStand() {
        return fishingStand;
    }

    public void setFishingStand(FishingStand fishingStand) {
        this.fishingStand = fishingStand;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", user=" + user +
                ", fishingStand=" + fishingStand +
                ", orderDate=" + orderDate +
                ", status='" + status + '\'' +
                ", totalAmount=" + totalAmount +
                '}';
    }
}
