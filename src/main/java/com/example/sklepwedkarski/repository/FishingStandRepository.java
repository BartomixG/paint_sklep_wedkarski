package com.example.sklepwedkarski.repository;

import com.example.sklepwedkarski.entity.Fishery;
import com.example.sklepwedkarski.entity.FishingStand;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FishingStandRepository extends CrudRepository<FishingStand, Integer> {
    List<FishingStand> findByFishery(Fishery fishery);
    List<FishingStand> findByFisheryAndIsAvailable(Fishery fishery, Boolean isAvailable);
}
