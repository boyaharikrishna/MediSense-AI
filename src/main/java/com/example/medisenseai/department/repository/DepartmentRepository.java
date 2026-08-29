package com.example.medisenseai.department.repository;

import com.example.medisenseai.department.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    boolean existsByCode(String code);

    Optional<Department> findByCode(String code);
}