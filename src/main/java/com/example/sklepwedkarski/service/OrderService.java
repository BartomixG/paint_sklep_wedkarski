package com.example.sklepwedkarski.service;

import com.example.sklepwedkarski.entity.Order;
import com.example.sklepwedkarski.entity.OrderItem;
import com.example.sklepwedkarski.repository.OrderItemRepository;
import com.example.sklepwedkarski.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    public List<Order> getAllOrders() {
        List<Order> orders = new ArrayList<>();
        orderRepository.findAll().forEach(orders::add);
        return orders;
    }

    public Optional<Order> getOrderById(Integer id) {
        return orderRepository.findById(id);
    }

    public Optional<List<OrderItem>> getOrderItems(Integer id) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent()) {
            return Optional.of(orderItemRepository.findByOrder(order.get()));
        }
        return Optional.empty();
    }

    public Order createOrder(Order order) {
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");
        return orderRepository.save(order);
    }

    public Optional<Order> updateOrderStatus(Integer id, String status) {
        Optional<Order> existingOrder = orderRepository.findById(id);
        if (existingOrder.isPresent()) {
            Order order = existingOrder.get();
            order.setStatus(status);
            return Optional.of(orderRepository.save(order));
        }
        return Optional.empty();
    }

    public boolean deleteOrder(Integer id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
