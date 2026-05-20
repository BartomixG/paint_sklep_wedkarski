package com.example.sklepwedkarski.repository;

import com.example.sklepwedkarski.entity.Cart;
import com.example.sklepwedkarski.entity.CartItem;
import com.example.sklepwedkarski.entity.Product;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends CrudRepository<CartItem, Integer> {
    List<CartItem> findByCart(Cart cart);
    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
}
