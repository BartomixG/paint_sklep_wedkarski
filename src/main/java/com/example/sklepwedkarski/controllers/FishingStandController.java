package com.example.sklepwedkarski.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}