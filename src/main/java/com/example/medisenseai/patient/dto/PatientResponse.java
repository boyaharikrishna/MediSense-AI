package com.example.medisenseai.patient.dto;

import java.time.LocalDate;

public class PatientResponse {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String gender;
    private LocalDate dateOfBirth;
    private boolean active;

    public PatientResponse(
            Long id,
            String name,
            String email,
            String phone,
            String gender,
            LocalDate dateOfBirth,
            boolean active
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getGender() {
        return gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public boolean isActive() {
        return active;
    }
}