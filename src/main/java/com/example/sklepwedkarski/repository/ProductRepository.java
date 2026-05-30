package com.example.sklepwedkarski.repository;

import com.example.sklepwedkarski.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByCategory(String category);

    @Query(value = "SELECT DISTINCT p.* FROM produkt p " +
            "JOIN produkt_ryba pr ON p.id = pr.produkt_id " +
            "JOIN lowisko_ryba lr ON pr.ryba_id = lr.ryba_id " +
            "WHERE lr.lowisko_id = :fisheryId", nativeQuery = true)
    List<Product> findByFisheryId(@Param("fisheryId") Integer fisheryId);
}
