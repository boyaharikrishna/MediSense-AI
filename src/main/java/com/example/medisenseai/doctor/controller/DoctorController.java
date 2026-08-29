package com.example.medisenseai.doctor.controller;

import com.example.medisenseai.common.response.ApiResponse;
import com.example.medisenseai.doctor.dto.CreateDoctorRequest;
import com.example.medisenseai.doctor.dto.DoctorResponse;
import com.example.medisenseai.doctor.dto.UpdateDoctorRequest;
import com.example.medisenseai.doctor.service.DoctorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/doctors")
@CrossOrigin(origins = "http://localhost:5173")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    // Create Doctor
    @PostMapping
    public ResponseEntity<ApiResponse<DoctorResponse>> createDoctor(
            @RequestBody CreateDoctorRequest request
    ) {

        DoctorResponse doctor =
                doctorService.createDoctor(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ApiResponse.success(
                                "Doctor created successfully",
                                doctor
                        )
                );
    }

    // Get All Doctors
    @GetMapping
    public ResponseEntity<ApiResponse<List<DoctorResponse>>> getAllDoctors() {

        List<DoctorResponse> doctors =
                doctorService.getAllDoctors();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Doctors fetched successfully",
                        doctors
                )
        );
    }

    // Get Doctor By ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DoctorResponse>> getDoctorById(
            @PathVariable Long id
    ) {

        DoctorResponse doctor =
                doctorService.getDoctorById(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Doctor fetched successfully",
                        doctor
                )
        );
    }

    // Update Doctor
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<DoctorResponse>> updateDoctor(
            @PathVariable Long id,
            @RequestBody UpdateDoctorRequest request
    ) {

        DoctorResponse doctor =
                doctorService.updateDoctor(id, request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Doctor updated successfully",
                        doctor
                )
        );
    }

    // Activate / Deactivate Doctor
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<DoctorResponse>> updateDoctorStatus(
            @PathVariable Long id,
            @RequestParam boolean active
    ) {

        DoctorResponse doctor =
                doctorService.updateDoctorStatus(id, active);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Doctor status updated successfully",
                        doctor
                )
        );
    }

    // Delete Doctor
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDoctor(
            @PathVariable Long id
    ) {

        doctorService.deleteDoctor(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Doctor deleted successfully",
                        null
                )
        );
    }
}