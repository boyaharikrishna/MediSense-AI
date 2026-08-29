package com.example.medisenseai.department.controller;

import com.example.medisenseai.common.response.ApiResponse;
import com.example.medisenseai.department.entity.Department;
import com.example.medisenseai.department.service.DepartmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/departments")
@CrossOrigin(origins = "http://localhost:5173")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    // Create Department
    @PostMapping
    public ResponseEntity<ApiResponse<Department>> createDepartment(
            @RequestBody Department department
    ) {

        Department savedDepartment =
                departmentService.createDepartment(department);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ApiResponse.success(
                                "Department created successfully",
                                savedDepartment
                        )
                );
    }

    // Get All Departments
    @GetMapping
    public ResponseEntity<ApiResponse<List<Department>>> getAllDepartments() {

        List<Department> departments =
                departmentService.getAllDepartments();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Departments fetched successfully",
                        departments
                )
        );
    }

    // Get Department By ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Department>> getDepartmentById(
            @PathVariable Long id
    ) {

        Department department =
                departmentService.getDepartmentById(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Department fetched successfully",
                        department
                )
        );
    }

    // Update Department
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Department>> updateDepartment(
            @PathVariable Long id,
            @RequestBody Department department
    ) {

        Department updatedDepartment =
                departmentService.updateDepartment(id, department);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Department updated successfully",
                        updatedDepartment
                )
        );
    }

    // Activate / Deactivate Department
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Department>> updateDepartmentStatus(
            @PathVariable Long id,
            @RequestParam boolean active
    ) {

        Department updatedDepartment =
                departmentService.updateDepartmentStatus(id, active);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Department status updated successfully",
                        updatedDepartment
                )
        );
    }
    // Delete Department
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDepartment(
            @PathVariable Long id
    ) {

        departmentService.deleteDepartment(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Department deleted successfully",
                        null
                )
        );
    }
}