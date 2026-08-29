package com.example.medisenseai.doctor.repository;

import com.example.medisenseai.doctor.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    Optional<Doctor> findByEmail(String email);

    Optional<Doctor> findByPhone(String phone);
}