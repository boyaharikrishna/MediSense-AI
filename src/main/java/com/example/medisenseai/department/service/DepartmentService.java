package com.example.medisenseai.department.service;

import com.example.medisenseai.department.entity.Department;
import com.example.medisenseai.department.repository.DepartmentRepository;
import com.example.medisenseai.exception.DuplicateResourceException;
import com.example.medisenseai.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    // Create Department
    public Department createDepartment(Department department) {

        if (departmentRepository.existsByCode(department.getCode())) {
            throw new DuplicateResourceException(
                    "Department code already exists: " + department.getCode()
            );
        }

        return departmentRepository.save(department);
    }

    // Get All Departments
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    // Get Department By ID
    public Department getDepartmentById(Long id) {

        return departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Department not found with id: " + id
                        )
                );
    }

    // Update Department
    public Department updateDepartment(Long id, Department department) {

        Department existingDepartment = getDepartmentById(id);

        // Check whether another department already uses this code
        departmentRepository.findByCode(department.getCode())
                .ifPresent(foundDepartment -> {

                    // Same department అయితే duplicate కాదు
                    if (!foundDepartment.getId().equals(id)) {
                        throw new DuplicateResourceException(
                                "Department code already exists: "
                                        + department.getCode()
                        );
                    }
                });

        existingDepartment.setName(department.getName());
        existingDepartment.setCode(department.getCode());
        existingDepartment.setDescription(department.getDescription());
        existingDepartment.setActive(department.isActive());

        return departmentRepository.save(existingDepartment);
    }

    // Activate / Deactivate Department
    public Department updateDepartmentStatus(Long id, boolean active) {

        Department department = getDepartmentById(id);

        department.setActive(active);

        return departmentRepository.save(department);
    }

    // Delete Department
    public void deleteDepartment(Long id) {

        Department department = getDepartmentById(id);

        departmentRepository.delete(department);
    }
}