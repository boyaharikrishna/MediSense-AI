package com.example.medisenseai.user.entity;

import com.example.medisenseai.common.response.enums.Role;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        }
)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false, unique = true, length = 50)
    private String username;


    @Column(nullable = false, unique = true, length = 100)
    private String email;


    @Column(nullable = false)
    private String password;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.RECEPTIONIST;


    @Column(nullable = false)
    private boolean active = true;


    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;


    @Column(nullable = false)
    private LocalDateTime updatedAt;


    public User() {
    }


    @PrePersist
    public void onCreate() {

        this.createdAt = LocalDateTime.now();

        this.updatedAt = LocalDateTime.now();

        // Safety: role null అయితే default role ఇవ్వాలి
        if (this.role == null) {

            this.role = Role.RECEPTIONIST;

        }

    }


    @PreUpdate
    public void onUpdate() {

        this.updatedAt = LocalDateTime.now();

    }


    public Long getId() {
        return id;
    }


    public String getUsername() {
        return username;
    }


    public void setUsername(
            String username
    ) {
        this.username = username;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(
            String email
    ) {
        this.email = email;
    }


    public String getPassword() {
        return password;
    }


    public void setPassword(
            String password
    ) {
        this.password = password;
    }


    public Role getRole() {
        return role;
    }


    public void setRole(
            Role role
    ) {
        this.role = role;
    }


    public boolean isActive() {
        return active;
    }


    public void setActive(
            boolean active
    ) {
        this.active = active;
    }


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }


    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}