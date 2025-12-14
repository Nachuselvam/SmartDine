package com.smartdine.config;

import com.google.genai.Client;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GeminiConfig {

    @Bean
    public Client geminiClient() {
        // Read the API key directly from environment variable
        String apiKey = System.getenv("GOOGLE_API_KEY");
        if (apiKey == null || apiKey.isEmpty()) {
            throw new RuntimeException(
                    "Environment variable GOOGLE_API_KEY is not set! " +
                            "Please set it before running the application."
            );
        }

        // Build the Gemini client
        return Client.builder()
                .apiKey(apiKey)
                .build();
    }
}