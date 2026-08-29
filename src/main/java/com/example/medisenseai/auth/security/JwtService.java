package com.example.medisenseai.auth.security;

import com.example.medisenseai.user.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {
    public boolean isRefreshTokenValid(String token) {

        try {
            Claims claims = extractAllClaims(token);

            Date expiration = claims.getExpiration();

            return expiration != null && !expiration.before(new Date());

        } catch (Exception exception) {
            return false;
        }
    }

    private static final String SECRET_KEY =
            "MediSenseAiJwtSecretKeyForDevelopmentOnlyChangeThisToEnvironmentVariable123456";

    private static final long ACCESS_TOKEN_EXPIRATION = 1000 * 60 * 60; // 1 hour

    private static final long REFRESH_TOKEN_EXPIRATION =
            1000L * 60 * 60 * 24 * 7; // 7 days

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes(StandardCharsets.UTF_8)
        );
    }

    public String generateAccessToken(User user) {

        return Jwts.builder()
                .subject(user.getUsername())
                .claim("userId", user.getId())
                .claim("role", user.getRole().name())
                .issuedAt(new Date())
                .expiration(
                        new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION)
                )
                .signWith(getSigningKey())
                .compact();
    }

    public String generateRefreshToken(User user) {

        return Jwts.builder()
                .subject(user.getUsername())
                .issuedAt(new Date())
                .expiration(
                        new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION)
                )
                .signWith(getSigningKey())
                .compact();
    }

    public String extractUsername(String token) {

        return extractAllClaims(token).getSubject();
    }

    public Long extractUserId(String token) {

        Object userId = extractAllClaims(token).get("userId");

        if (userId instanceof Number) {
            return ((Number) userId).longValue();
        }

        return null;
    }

    public String extractRole(String token) {

        return extractAllClaims(token).get("role", String.class);
    }

    public boolean isTokenValid(String token) {

        try {
            extractAllClaims(token);

            return !isTokenExpired(token);

        } catch (Exception exception) {
            return false;
        }
    }

    private boolean isTokenExpired(String token) {

        Date expiration = extractAllClaims(token).getExpiration();

        return expiration.before(new Date());
    }

    private Claims extractAllClaims(String token) {

        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}