package com.example.sklepwedkarski.repository;

import com.example.sklepwedkarski.entity.CartItem;
import org.springframework.data.repository.CrudRepository;

public interface CartItemRepository extends CrudRepository<CartItem, Integer> {
}
