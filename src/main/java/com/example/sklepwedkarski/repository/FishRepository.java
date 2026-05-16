package com.example.sklepwedkarski.repository;

import com.example.sklepwedkarski.entity.Fish;
import org.springframework.data.repository.CrudRepository;

public interface FishRepository extends CrudRepository<Fish, Integer> {
}
