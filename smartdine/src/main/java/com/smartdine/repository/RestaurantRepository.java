package com.smartdine.repository;

import com.smartdine.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant,Integer> {

    @Query("""
        SELECT r FROM Restaurant r
        WHERE (:cuisine IS NULL OR LOWER(r.cuisine) LIKE LOWER(CONCAT('%', :cuisine, '%')))
          AND (:location IS NULL OR LOWER(r.location) LIKE LOWER(CONCAT('%', :location, '%')))
          AND (:priceRange IS NULL OR LOWER(r.priceRange) = LOWER(:priceRange))
          AND (:moodTags IS NULL OR LOWER(r.moodTags) LIKE LOWER(CONCAT('%', :moodTags, '%')))
    """)
    List<Restaurant> searchRestaurants(
            @Param("cuisine") String cuisine,
            @Param("location") String location,
            @Param("priceRange") String priceRange,
            @Param("moodTags") String moodTags
    );
}
