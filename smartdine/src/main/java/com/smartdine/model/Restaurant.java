package com.smartdine.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "restaurants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String cuisine;

    @Column(name = "price_range")
    private String priceRange;

    private Double rating;

    private String location;

    @Column(columnDefinition = "TEXT")
    private String specialties;

    private String moodTags;

    @Column(name = "image_url")
    @JsonProperty("image_url")
    private String imageUrl;

}
