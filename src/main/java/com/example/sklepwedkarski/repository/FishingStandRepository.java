package com.example.sklepwedkarski.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.sklepwedkarski.entity.Fishery;
import com.example.sklepwedkarski.entity.FishingStand;

public interface FishingStandRepository extends CrudRepository<FishingStand, Integer> {
    List<FishingStand> findByFishery(Fishery fishery);
    List<FishingStand> findByFisheryAndIsAvailable(Fishery fishery, Boolean isAvailable);
}
