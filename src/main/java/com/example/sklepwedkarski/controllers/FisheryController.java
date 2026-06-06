package com.example.sklepwedkarski.controllers;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.sklepwedkarski.entity.Fishery;
import com.example.sklepwedkarski.service.FisheryService;

import tools.jackson.databind.ObjectMapper;

@RestController
@RequestMapping(value = "/api/fisheries", produces = "application/json;charset=UTF-8")
@CrossOrigin(
      origins = {
          "http://localhost:5173",
          "https://bartomix.tailc381e2.ts.net",
          "https://bartomiejs-macbook-pro.tailc381e2.ts.net"
      },
      allowCredentials = "true"
  )public class FisheryController {

    @Autowired
    private FisheryService fisheryService;

    @GetMapping
    public List<Fishery> getAllFisheries() {
        return fisheryService.getAllFisheries();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fishery> getFisheryById(@PathVariable Integer id) {
        return fisheryService.getFisheryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //@PostMapping
    //public ResponseEntity<Fishery> addFishery(@RequestBody Fishery fishery) {
    //    return ResponseEntity.ok(fisheryService.addFishery(fishery));
    //}

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Fishery> addFisheryWithImageAndFish(
            @RequestParam("fisheryStr") String fisheryStr, 
            @RequestParam("image") MultipartFile imageFile) {
        
        // Target directory on your server volume
        String uploadDir = "/app/uploads/";
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        try {
            // 1. Manually deserialize the stringified JSON payload
            ObjectMapper objectMapper = new ObjectMapper();
            Fishery fishery = objectMapper.readValue(fisheryStr, Fishery.class);

            // 2. Handle file writing tracking operations
            String uniqueFileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
            File destinationFile = new File(uploadDir + uniqueFileName);
            imageFile.transferTo(destinationFile);

            // 3. Complete the entity link referencing your shared Nginx volume path
            fishery.setFisheryUrl("/uploads/" + uniqueFileName);
            
            // 4. Persist to database via Service Layer (Hibernate takes care of mapping entries to 'lowisko_ryba')
            Fishery savedFishery = fisheryService.addFishery(fishery);
            
            return ResponseEntity.ok(savedFishery);
            
        } catch (IOException e) {
            System.err.println("Błąd deserializacji lub zapisu pliku: " + e.getMessage());
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/ryba/{fishName}")
    public List<Fishery> getFisheriesByFish(@PathVariable String fishName) {
        return fisheryService.getFisheriesByFish(fishName);
    }
}