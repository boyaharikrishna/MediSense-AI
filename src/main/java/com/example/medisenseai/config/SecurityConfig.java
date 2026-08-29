package com.example.medisenseai.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {


    // ========================================
    // PASSWORD ENCODER
    // ========================================

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }


    // ========================================
    // SECURITY CONFIGURATION
    // ========================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                // Enable CORS using CorsConfig.java
                .cors(cors -> {})


                // Disable CSRF
                .csrf(csrf -> csrf.disable())


                // Stateless API
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )


                // IMPORTANT:
                // Allow ALL requests without login
                .authorizeHttpRequests(auth ->
                        auth.anyRequest().permitAll()
                );


        return http.build();

    }

}