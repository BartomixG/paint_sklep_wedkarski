package com.example.sklepwedkarski.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sklepwedkarski.entity.Fishery;
import com.example.sklepwedkarski.service.FisheryService;

@RestController
@RequestMapping(value = "/api/fisheries", produces = "application/json;charset=UTF-8")
@CrossOrigin(origins = "http://localhost:5173")
public class FisheryController {

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

    @PostMapping
    public ResponseEntity<Fishery> addFishery(@RequestBody Fishery fishery) {
        return ResponseEntity.ok(fisheryService.addFishery(fishery));
    }
}