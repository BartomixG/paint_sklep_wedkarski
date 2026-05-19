package com.example.sklepwedkarski.repository;

import com.example.sklepwedkarski.entity.OrderItem;
import com.example.sklepwedkarski.entity.Order;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderItemRepository extends CrudRepository<OrderItem, Integer> {
    List<OrderItem> findByOrder(Order order);
}
