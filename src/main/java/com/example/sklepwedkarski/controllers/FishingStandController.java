package com.example.sklepwedkarski.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.sklepwedkarski.entity.FishingStand;
import com.example.sklepwedkarski.service.FishingStandService;

@RestController
@RequestMapping(value = "/api/stands", produces = "application/json;charset=UTF-8")
@CrossOrigin(
      origins = {
          "http://localhost:5173",
          "https://bartomix.tailc381e2.ts.net",
          "https://bartomiejs-macbook-pro.tailc381e2.ts.net"
      },
      allowCredentials = "true"
  )
  public class FishingStandController {

    @Autowired
    private FishingStandService fishingStandService;

    // Pobieranie wszystkich stanowisk dla konkretnego łowiska
    @GetMapping("/fishery/{fisheryId}")
    public Optional<List<FishingStand>> getStandsByFishery(@PathVariable Integer fisheryId) {
        return fishingStandService.getStandsByFishery(fisheryId);
    }

    @PutMapping("/{id}/availability")
    public ResponseEntity<FishingStand> updateAvailability(@PathVariable Integer id, @RequestParam Boolean available) {
        return fishingStandService.updateAvailability(id, available)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/fishery/{fisheryId}")
    public ResponseEntity<FishingStand> addStand(@PathVariable Integer fisheryId, @RequestBody FishingStand fishingStand) {
        return fishingStandService.addStand(fisheryId, fishingStand)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}