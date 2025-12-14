package com.smartdine.controller;

import com.smartdine.model.Restaurant;
import com.smartdine.repository.RestaurantRepository;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin
public class RestaurantController {

    private final RestaurantRepository repo;

    public RestaurantController(RestaurantRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/surprise")
    public Restaurant surprise() {
        List<Restaurant> all = repo.findAll();
        Random rand = new Random();
        return all.get(rand.nextInt(all.size()));
    }

    @GetMapping
    public List<Restaurant> all(@RequestParam(required = false) String q,
                                @RequestParam(required = false) String price,
                                @RequestParam(required = false) String cuisine) {

        List<Restaurant> restaurants = repo.findAll();

        if (q != null && !q.isEmpty()) {
            String query = q.toLowerCase();
            restaurants = restaurants.stream()
                    .filter(r ->
                            (r.getName() != null && r.getName().toLowerCase().contains(query)) ||
                                    (r.getCuisine() != null && r.getCuisine().toLowerCase().contains(query)) ||
                                    (r.getSpecialties() != null && r.getSpecialties().toLowerCase().contains(query)) ||
                                    (r.getMoodTags() != null && r.getMoodTags().toLowerCase().contains(query))
                    )
                    .collect(Collectors.toList());
        }

        if (price != null && !price.isEmpty()) {
            restaurants = restaurants.stream()
                    .filter(r -> r.getPriceRange() != null && r.getPriceRange().equalsIgnoreCase(price))
                    .collect(Collectors.toList());
        }

        if (cuisine != null && !cuisine.isEmpty()) {
            restaurants = restaurants.stream()
                    .filter(r -> r.getCuisine() != null && r.getCuisine().equalsIgnoreCase(cuisine))
                    .collect(Collectors.toList());
        }

        return restaurants;
    }
}
