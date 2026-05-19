package com.example.sklepwedkarski.repository;

import com.example.sklepwedkarski.entity.Product;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductRepository extends CrudRepository<Product, Integer> {
    List<Product> findByCategory(String category);
}
