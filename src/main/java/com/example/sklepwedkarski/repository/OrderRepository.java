package com.example.sklepwedkarski.repository;

import com.example.sklepwedkarski.entity.Order;
import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<Order, Integer> {
}
