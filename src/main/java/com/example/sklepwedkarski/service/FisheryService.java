package com.example.sklepwedkarski.service;

import com.example.sklepwedkarski.entity.Fishery;
import com.example.sklepwedkarski.entity.FishingStand;
import com.example.sklepwedkarski.repository.FisheryRepository;
import com.example.sklepwedkarski.repository.FishingStandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FisheryService {

    @Autowired
    private FisheryRepository fisheryRepository;

    @Autowired
    private FishingStandRepository fishingStandRepository;

    public List<Fishery> getAllFisheries() {
        List<Fishery> fisheries = new ArrayList<>();
        fisheryRepository.findAll().forEach(fisheries::add);
        return fisheries;
    }

    public Optional<Fishery> getFisheryById(Integer id) {
        return fisheryRepository.findById(id);
    }

    public Optional<List<FishingStand>> getFishingStands(Integer id) {
        Optional<Fishery> fishery = fisheryRepository.findById(id);
        return fishery.map(value -> fishingStandRepository.findByFishery(value));
    }

    public Optional<List<FishingStand>> getAvailableStands(Integer id) {
        Optional<Fishery> fishery = fisheryRepository.findById(id);
        return fishery.map(value -> fishingStandRepository.findByFisheryAndIsAvailable(value, true));
    }

    public Fishery addFishery(Fishery fishery) {
        return fisheryRepository.save(fishery);
    }

    public Optional<Fishery> updateFishery(Integer id, Fishery updatedFishery) {
        Optional<Fishery> existingFishery = fisheryRepository.findById(id);
        if (existingFishery.isPresent()) {
            Fishery fishery = existingFishery.get();
            fishery.setName(updatedFishery.getName());
            fishery.setDescription(updatedFishery.getDescription());
            fishery.setFisheryUrl(updatedFishery.getFisheryUrl());
            return Optional.of(fisheryRepository.save(fishery));
        }
        return Optional.empty();
    }

    public boolean deleteFishery(Integer id) {
        if (fisheryRepository.existsById(id)) {
            fisheryRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
