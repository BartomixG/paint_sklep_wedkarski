package com.example.sklepwedkarski.repository;

import com.example.sklepwedkarski.entity.Order;
import com.example.sklepwedkarski.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderRepository extends CrudRepository<Order, Integer> {
    List<Order> findByUser(User user);
}
