package com.example.sklepwedkarski.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sklepwedkarski.entity.Fish;
import com.example.sklepwedkarski.repository.FishRepository;

@RestController
@RequestMapping(value = "/api/fish", produces = "application/json;charset=UTF-8")
@CrossOrigin(
    origins = {
        "http://localhost:5173",
        "https://bartomix.tailc381e2.ts.net",
        "https://bartomiejs-macbook-pro.tailc381e2.ts.net"
    },
    allowCredentials = "true"
)
public class FishController {

    @Autowired
    private FishRepository fishRepository;

    @GetMapping
    public Iterable<Fish> getAllFish() {
        return fishRepository.findAll();
    }
}