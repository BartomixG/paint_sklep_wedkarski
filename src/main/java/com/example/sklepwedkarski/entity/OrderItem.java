package com.example.sklepwedkarski.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "zamowione_produkty")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "zamowienie_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "produkt_id")
    private Product product;

    @Column(name = "ilosc")
    private Integer quantity;

    @Column(name = "cena_zakupu")
    private BigDecimal purchasePrice;

    public OrderItem() {
    }

    public OrderItem(Order order, Product product, Integer quantity, BigDecimal purchasePrice) {
        this.order = order;
        this.product = product;
        this.quantity = quantity;
        this.purchasePrice = purchasePrice;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(BigDecimal purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    @Override
    public String toString() {
        return "OrderItem{" +
                "id=" + id +
                ", order=" + order +
                ", product=" + product +
                ", quantity=" + quantity +
                ", purchasePrice=" + purchasePrice +
                '}';
    }
}
