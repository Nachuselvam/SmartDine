package com.smartdine.controller;

import com.smartdine.dto.AiRequest;
import com.smartdine.model.Restaurant;
import com.smartdine.service.AiService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin("*")
public class AiController {

    private static final Logger log = LoggerFactory.getLogger(AiController.class);
    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/chat")
    public ResponseEntity<String> chat(@RequestBody AiRequest request) {
        if (request == null || request.getMessage() == null || request.getMessage().isBlank()) {
            return ResponseEntity.badRequest().body("Message cannot be empty.");
        }
        String response = aiService.getAiResponse(request.getMessage());
        log.info("Chat response: {}", response);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/extract-restaurant")
    public ResponseEntity<?> extractRestaurant(@RequestBody AiRequest request) {
        if (request == null || request.getMessage() == null || request.getMessage().isBlank()) {
            return ResponseEntity.badRequest().body("Message cannot be empty.");
        }
        try {
            Restaurant restaurant = aiService.extractRestaurant(request.getMessage());
            log.info("Extracted restaurant filter: {}", restaurant);
            return ResponseEntity.ok(restaurant);
        } catch (Exception e) {
            log.error("Error extracting restaurant: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body("Error extracting restaurant: " + e.getMessage());
        }
    }

    @PostMapping("/search")
    public ResponseEntity<?> search(@RequestBody AiRequest request) {
        if (request == null || request.getMessage() == null || request.getMessage().isBlank()) {
            return ResponseEntity.badRequest().body("Message cannot be empty.");
        }
        try {
            Restaurant extracted = aiService.extractRestaurant(request.getMessage());
            List<Restaurant> results = aiService.findMatchingRestaurants(extracted);

            if (results.isEmpty()) {
                log.info("No restaurants matched all or partial conditions for search.");
            } else {
                log.info("Search results count: {}", results.size());
            }

            return ResponseEntity.ok(results);
        } catch (Exception e) {
            log.error("Error during search: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body("Error during search: " + e.getMessage());
        }
    }

    @PostMapping("/suggest")
    public ResponseEntity<?> suggest(@RequestBody AiRequest request) {
        if (request == null || request.getMessage() == null || request.getMessage().isBlank()) {
            return ResponseEntity.badRequest().body("Message cannot be empty.");
        }
        try {
            List<Restaurant> suggestions = aiService.suggestRestaurants(request.getMessage());

            if (suggestions.isEmpty()) {
                log.info("No restaurants matched all or partial conditions for suggestion.");
            } else {
                log.info("Suggestions count: {}", suggestions.size());
            }

            return ResponseEntity.ok(suggestions);
        } catch (Exception e) {
            log.error("Error suggesting restaurants: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body("Error suggesting restaurants: " + e.getMessage());
        }
    }
}
