package com.example.medisenseai.prescription.repository;

import com.example.medisenseai.prescription.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrescriptionRepository
        extends JpaRepository<Prescription, Long> {
}