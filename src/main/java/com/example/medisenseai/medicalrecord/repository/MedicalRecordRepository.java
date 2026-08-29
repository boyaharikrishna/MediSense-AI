package com.example.medisenseai.medicalrecord.repository;

import com.example.medisenseai.medicalrecord.entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalRecordRepository
        extends JpaRepository<MedicalRecord, Long> {
}