package com.example.sklepwedkarski.service;

import com.example.sklepwedkarski.entity.Fish;
import com.example.sklepwedkarski.entity.Product;
import com.example.sklepwedkarski.repository.FishRepository;
import com.example.sklepwedkarski.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FishService {

    @Autowired
    private FishRepository fishRepository;

    @Autowired
    private ProductRepository productRepository;


    public List<Fish> getAllFish() {
        List<Fish> fish = new ArrayList<>();
        fishRepository.findAll().forEach(fish::add);
        return fish;
    }


    public Optional<Fish> getFishById(Integer id) {
        return fishRepository.findById(id);
    }


    public Optional<Fish> getFishByName(String name) {
        return fishRepository.findByName(name);
    }

    // ADMIN
    public Fish addFish(Fish fish) {
        return fishRepository.save(fish);
    }

    // ADMIN
    public Optional<Fish> updateFish(Integer id, Fish updatedFish) {
        Optional<Fish> existingFish = fishRepository.findById(id);
        if (existingFish.isPresent()) {
            Fish fish = existingFish.get();
            fish.setName(updatedFish.getName());
            fish.setFishUrl(updatedFish.getFishUrl());
            return Optional.of(fishRepository.save(fish));
        }
        return Optional.empty();
    }

    // ADMIN
    public boolean deleteFish(Integer id) {
        if (fishRepository.existsById(id)) {
            fishRepository.deleteById(id);
            return true;
        }
        return false;
    }


    public List<Product> getSuggestedProducts(String fishName) {
        List<Product> allProducts = new ArrayList<>();
        productRepository.findAll().forEach(allProducts::add);

        List<Product> suggested = new ArrayList<>();
        for (Product product : allProducts) {
            if (product.getCategory() != null &&
                    product.getCategory().toLowerCase().contains(fishName.toLowerCase())) {
                suggested.add(product);
            }
        }
        return suggested;
    }
}
