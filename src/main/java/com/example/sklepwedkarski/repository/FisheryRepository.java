package com.example.sklepwedkarski.repository;

import com.example.sklepwedkarski.entity.Fishery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FisheryRepository extends JpaRepository<Fishery, Integer> {

    @Query("SELECT f FROM Fishery f JOIN f.fish fish WHERE LOWER(fish.name) LIKE LOWER(CONCAT('%', :fishName, '%'))")
    List<Fishery> findByFishName(@Param("fishName") String fishName);
}
