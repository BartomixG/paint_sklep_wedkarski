package com.example.sklepwedkarski.repository;

import com.example.sklepwedkarski.entity.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Integer> {
}
