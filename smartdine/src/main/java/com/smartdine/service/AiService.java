package com.smartdine.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.smartdine.model.Restaurant;
import com.smartdine.repository.RestaurantRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AiService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private Client geminiClient;

    public List<Restaurant> suggestRestaurants(String userMessage) {
        Restaurant extracted = extractRestaurant(userMessage);
        List<Restaurant> matches = findMatchingRestaurants(extracted);
        return rankMatches(matches, extracted);
    }
    public Restaurant extractRestaurant(String userMessage) {
        if (userMessage == null || userMessage.isBlank()) return new Restaurant();

        try {
            String prompt = "Extract restaurant attributes from this user query. " +
                    "Return ONLY a JSON object with keys: " +
                    "cuisine, priceRange (low/medium/high), " +
                    "moodTags (comma-separated, include adjectives like 'cheesy','spicy','sweet'), " +
                    "specialties (comma-separated, include dishes or ingredients). " +
                    "Duplicate adjectives if they fit both specialties and moodTags. " +
                    "Use empty string if not mentioned.\n" +
                    "User query: \"" + userMessage + "\"";

            GenerateContentResponse resp = geminiClient.models.generateContent(
                    "gemini-2.5-flash",
                    prompt,
                    null
            );

            String text = resp.text().trim();

            JSONObject obj;
            try {
                obj = new JSONObject(text);
            } catch (Exception ex) {
                int start = text.indexOf("{");
                int end = text.lastIndexOf("}");
                if (start >= 0 && end > start) obj = new JSONObject(text.substring(start, end + 1));
                else throw ex;
            }

            Restaurant r = new Restaurant();
            r.setCuisine(obj.optString("cuisine", ""));
            r.setPriceRange(obj.optString("priceRange", ""));
            r.setMoodTags(obj.optString("moodTags", ""));
            r.setSpecialties(obj.optString("specialties", ""));

            return r;

        } catch (Exception e) {
            e.printStackTrace();
            return new Restaurant();
        }
    }
    public String getAiResponse(String userMessage) {
        if (userMessage == null || userMessage.isBlank()) {
            return "Please provide a message!";
        }
        return "AI Response: I received your message -> \"" + userMessage + "\". I can also suggest restaurants!";
    }

    public List<Restaurant> findMatchingRestaurants(Restaurant filter) {
        List<Restaurant> all = restaurantRepository.findAll();
        List<Restaurant> strictMatches = new ArrayList<>();
        List<Restaurant> partialMatches = new ArrayList<>();

        String cuisine = safe(filter.getCuisine()).toLowerCase();
        String specialties = safe(filter.getSpecialties()).toLowerCase();
        String price = safe(filter.getPriceRange()).toLowerCase();
        String mood = safe(filter.getMoodTags()).toLowerCase();

        for (Restaurant r : all) {
            String rCuisine = safe(r.getCuisine()).toLowerCase();
            String rSpecs = safe(r.getSpecialties()).toLowerCase();
            String rPrice = safe(r.getPriceRange()).toLowerCase();
            String rMood = safe(r.getMoodTags()).toLowerCase();

            boolean matchesAll = true;
            boolean matchesAny = false;

            if (!cuisine.isEmpty() && !rCuisine.contains(cuisine)) matchesAll = false;
            else if(!cuisine.isEmpty()) matchesAny = true;

            if (!specialties.isEmpty()) {
                boolean specMatch = false;
                for (String s : specialties.split(",")) {
                    if(!s.isBlank() && rSpecs.contains(s.trim())) specMatch = true;
                }
                if(!specMatch) matchesAll=false; else matchesAny=true;
            }
            if (!price.isEmpty() && !rPrice.contains(price)) matchesAll=false;
            else if(!price.isEmpty()) matchesAny=true;

            if (!mood.isEmpty()) {
                boolean moodMatch=false;
                for(String m : mood.split(",")) {
                    if(!m.isBlank() && rMood.contains(m.trim())) moodMatch=true;
                }
                if(!moodMatch) matchesAll=false; else matchesAny=true;
            }

            if(matchesAll) strictMatches.add(r);
            else if(matchesAny) partialMatches.add(r);
        }
        if(!strictMatches.isEmpty()) return strictMatches;
        return partialMatches.size() > 2 ? partialMatches.subList(0, 2) : partialMatches;
    }
    private List<Restaurant> rankMatches(List<Restaurant> matches, Restaurant extracted) {
        if(matches==null||matches.isEmpty()||extracted==null) return matches;
        List<RestaurantScore> scored = new ArrayList<>();
        String cuisine = safe(extracted.getCuisine()).toLowerCase();
        String specialties = safe(extracted.getSpecialties()).toLowerCase();
        String mood = safe(extracted.getMoodTags()).toLowerCase();

        for(Restaurant r : matches) {
            String combined = (safe(r.getName())+" "+safe(r.getCuisine())+" "+safe(r.getSpecialties())+" "+safe(r.getMoodTags())).toLowerCase();
            int score=0;

            if(!cuisine.isEmpty() && combined.contains(cuisine)) score+=2;
            for(String s:specialties.split(",")) if(!s.isBlank() && combined.contains(s.trim())) score+=2;
            for(String m:mood.split(",")) if(!m.isBlank() && combined.contains(m.trim())) score+=1;

            scored.add(new RestaurantScore(r,score));
        }

        scored.sort((a,b)->Integer.compare(b.score,a.score));
        List<Restaurant> ranked = new ArrayList<>();
        for(RestaurantScore rs : scored) ranked.add(rs.restaurant);
        return ranked;
    }

    private static class RestaurantScore {
        Restaurant restaurant;
        int score;
        RestaurantScore(Restaurant restaurant,int score){this.restaurant=restaurant;this.score=score;}
    }

    private String safe(String s){ return s==null?"":s; }
}
