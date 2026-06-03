package com.example.sklepwedkarski.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Włączamy konfigurację CORS (rozwiązuje błąd z przeglądarki)
            .cors(cors -> cors.configure(http))
            
            // Wyłączamy ochronę CSRF (dzięki temu React może wysyłać POST)
            .csrf(csrf -> csrf.disable())
            
            // KLUCZOWE: Zezwalamy na KAŻDE żądanie bez logowania i bez generowania hasła w konsoli
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()
            );

        return http.build();
    }

    // Globalny filtr CORS – zapobiega blokowaniu przez przeglądarkę
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Zezwalamy na ruch z Twojego frontendu w React (Vite)
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "https://bartomix.tailc381e2.ts.net", "https://bartomiejs-macbook-pro.tailc381e2.ts.net"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        configuration.setExposedHeaders(Arrays.asList("Authorization"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return new CorsFilter(source);
    }
}