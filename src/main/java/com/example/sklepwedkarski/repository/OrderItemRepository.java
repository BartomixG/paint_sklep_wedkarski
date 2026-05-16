package com.example.sklepwedkarski.repository;

import com.example.sklepwedkarski.entity.OrderItem;
import org.springframework.data.repository.CrudRepository;

public interface OrderItemRepository extends CrudRepository<OrderItem, Integer> {
}
