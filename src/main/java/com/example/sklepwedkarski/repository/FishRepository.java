package com.example.sklepwedkarski.repository;

import com.example.sklepwedkarski.entity.Fish;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface FishRepository extends CrudRepository<Fish, Integer> {
    Optional<Fish> findByName(String name);
}
