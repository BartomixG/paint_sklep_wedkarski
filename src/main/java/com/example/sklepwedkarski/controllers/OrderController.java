package com.example.sklepwedkarski.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.sklepwedkarski.entity.Order;
import com.example.sklepwedkarski.entity.OrderItem;
import com.example.sklepwedkarski.service.OrderService;

@RestController
@RequestMapping(value = "/api/orders", produces = "application/json;charset=UTF-8")
@CrossOrigin(
      origins = {
          "http://localhost:5173",
          "https://bartomix.tailc381e2.ts.net",
          "https://bartomiejs-macbook-pro.tailc381e2.ts.net"
      },
      allowCredentials = "true"
  )
  public class OrderController {

    @Autowired
    private OrderService orderService;

    // ADMIN
    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Integer id) {
        return orderService.getOrderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/{id}/items")
    public ResponseEntity<List<OrderItem>> getOrderItems(@PathVariable Integer id) {
        return orderService.getOrderItems(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        return ResponseEntity.ok(orderService.createOrder(order));
        
    }

    @PostMapping("/items")
    public ResponseEntity<OrderItem> createOrderItem(@RequestBody OrderItem orderItem) {
        // Opcja A: Jeśli masz metodę zapisu w OrderService (zalecane):
        OrderItem savedItem = orderService.createOrderItem(orderItem);
        return ResponseEntity.ok(savedItem);
    }

    // ADMIN
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Integer id, @RequestParam String status) {
        return orderService.updateOrderStatus(id, status)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ADMIN
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Integer id) {
        if (orderService.deleteOrder(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}