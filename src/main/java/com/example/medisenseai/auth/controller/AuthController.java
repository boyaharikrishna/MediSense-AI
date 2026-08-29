package com.example.medisenseai.auth.controller;

import com.example.medisenseai.auth.dto.AuthResponse;
import com.example.medisenseai.auth.security.JwtService;
import com.example.medisenseai.common.response.ApiResponse;
import com.example.medisenseai.user.dto.LoginRequest;
import com.example.medisenseai.user.dto.RegisterRequest;
import com.example.medisenseai.user.entity.User;
import com.example.medisenseai.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.medisenseai.auth.dto.RefreshTokenRequest;
import com.example.medisenseai.exception.ResourceNotFoundException;
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(
            @Valid @RequestBody RefreshTokenRequest request
    ) {

        String refreshToken = request.getRefreshToken();

        if (!jwtService.isRefreshTokenValid(refreshToken)) {
            throw new ResourceNotFoundException("Invalid or expired refresh token");
        }

        String username = jwtService.extractUsername(refreshToken);

        User user = userService.findByUsername(username);

        String newAccessToken = jwtService.generateAccessToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user);

        AuthResponse authResponse = new AuthResponse(
                newAccessToken,
                newRefreshToken,
                user.getId(),
                user.getUsername(),
                user.getRole().name()
        );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Token refreshed successfully",
                        authResponse
                )
        );
    }

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(
            UserService userService,
            JwtService jwtService
    ) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> register(
            @Valid @RequestBody RegisterRequest request
    ) {

        userService.registerUser(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ApiResponse.success(
                                "User registered successfully"
                        )
                );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request
    ) {

        User user = userService.login(request);

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        AuthResponse authResponse = new AuthResponse(
                accessToken,
                refreshToken,
                user.getId(),
                user.getUsername(),
                user.getRole().name()
        );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Login successful",
                        authResponse
                )
        );
    }
}