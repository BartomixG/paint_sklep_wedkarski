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
public class FishingStandService {

    @Autowired
    private FishingStandRepository fishingStandRepository;

    @Autowired
    private FisheryRepository fisheryRepository;


    public List<FishingStand> getAllStands() {
        List<FishingStand> stands = new ArrayList<>();
        fishingStandRepository.findAll().forEach(stands::add);
        return stands;
    }


    public Optional<FishingStand> getStandById(Integer id) {
        return fishingStandRepository.findById(id);
    }


    public Optional<List<FishingStand>> getStandsByFishery(Integer fisheryId) {
        Optional<Fishery> fishery = fisheryRepository.findById(fisheryId);
        return fishery.map(value -> fishingStandRepository.findByFishery(value));
    }


    public Optional<List<FishingStand>> getAvailableStands(Integer fisheryId) {
        Optional<Fishery> fishery = fisheryRepository.findById(fisheryId);
        return fishery.map(value -> fishingStandRepository.findByFisheryAndIsAvailable(value, true));
    }

    // ADMIN
    public Optional<FishingStand> addStand(Integer fisheryId, FishingStand stand) {
        Optional<Fishery> fishery = fisheryRepository.findById(fisheryId);
        if (fishery.isPresent()) {
            stand.setFishery(fishery.get());
            stand.setIsAvailable(true);
            stand.setXPos(stand.getXPos());
            stand.setYPos(stand.getYPos());
            return Optional.of(fishingStandRepository.save(stand));
        }
        return Optional.empty();
    }


    public Optional<FishingStand> updateAvailability(Integer standId, Boolean isAvailable) {
        Optional<FishingStand> existingStand = fishingStandRepository.findById(standId);
        if (existingStand.isPresent()) {
            FishingStand stand = existingStand.get();
            stand.setIsAvailable(isAvailable);
            return Optional.of(fishingStandRepository.save(stand));
        }
        return Optional.empty();
    }

    // ADMIN
    public boolean deleteStand(Integer id) {
        if (fishingStandRepository.existsById(id)) {
            fishingStandRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
