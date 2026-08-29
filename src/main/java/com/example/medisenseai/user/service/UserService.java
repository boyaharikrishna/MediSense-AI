package com.example.medisenseai.user.service;

import com.example.medisenseai.common.response.enums.Role;
import com.example.medisenseai.user.dto.LoginRequest;
import com.example.medisenseai.user.dto.RegisterRequest;
import com.example.medisenseai.user.entity.User;
import com.example.medisenseai.user.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;


    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;

        this.passwordEncoder = passwordEncoder;
    }


    // ==========================================
    // REGISTER USER
    // ==========================================

    public void registerUser(
            RegisterRequest request
    ) {

        // Username already exists check
        if (
                userRepository.existsByUsername(
                        request.getUsername()
                )
        ) {

            throw new RuntimeException(
                    "Username already exists"
            );

        }


        // Email already exists check
        if (
                userRepository.existsByEmail(
                        request.getEmail()
                )
        ) {

            throw new RuntimeException(
                    "Email already exists"
            );

        }


        // Create new user
        User user = new User();


        // Set username
        user.setUsername(
                request.getUsername()
        );


        // Set email
        user.setEmail(
                request.getEmail()
        );


        // Encrypt password
        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );


        // IMPORTANT: Set default role
        user.setRole(
                Role.RECEPTIONIST
        );


        // Set user active
        user.setActive(
                true
        );


        // Save user to database
        userRepository.save(
                user
        );
    }


    // ==========================================
    // LOGIN USER
    // ==========================================

    public User login(
            LoginRequest request
    ) {

        User user =
                userRepository
                        .findByUsername(
                                request.getUsernameOrEmail()
                        )
                        .orElseGet(
                                () ->
                                        userRepository
                                                .findByEmail(
                                                        request.getUsernameOrEmail()
                                                )
                                                .orElseThrow(
                                                        () ->
                                                                new RuntimeException(
                                                                        "Invalid username or password"
                                                                )
                                                )
                        );


        // Verify password
        if (
                !passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                )
        ) {

            throw new RuntimeException(
                    "Invalid username or password"
            );

        }


        // Check account active
        if (
                !user.isActive()
        ) {

            throw new RuntimeException(
                    "User account is inactive"
            );

        }


        return user;
    }


    // ==========================================
    // FIND USER BY USERNAME
    // ==========================================

    public User findByUsername(
            String username
    ) {

        return userRepository
                .findByUsername(
                        username
                )
                .orElseThrow(
                        () ->
                                new RuntimeException(
                                        "User not found"
                                )
                );
    }
}