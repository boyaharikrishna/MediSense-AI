package com.example.medisenseai.patient.repository;

import com.example.medisenseai.patient.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    Optional<Patient> findByEmail(String email);

    Optional<Patient> findByPhone(String phone);
}