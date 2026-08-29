package com.example.medisenseai.prescription.controller;

import com.example.medisenseai.common.response.ApiResponse;
import com.example.medisenseai.prescription.dto.CreatePrescriptionRequest;
import com.example.medisenseai.prescription.dto.PrescriptionResponse;
import com.example.medisenseai.prescription.service.PrescriptionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/prescriptions")
@CrossOrigin(origins = "http://localhost:5173")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    public PrescriptionController(
            PrescriptionService prescriptionService
    ) {
        this.prescriptionService = prescriptionService;
    }

    // Create Prescription
    @PostMapping
    public ResponseEntity<ApiResponse<PrescriptionResponse>>
    createPrescription(
            @RequestBody CreatePrescriptionRequest request
    ) {

        PrescriptionResponse prescription =
                prescriptionService.createPrescription(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ApiResponse.success(
                                "Prescription created successfully",
                                prescription
                        )
                );
    }

    // Get All Prescriptions
    @GetMapping
    public ResponseEntity<ApiResponse<List<PrescriptionResponse>>>
    getAllPrescriptions() {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Prescriptions fetched successfully",
                        prescriptionService.getAllPrescriptions()
                )
        );
    }

    // Get Prescription By ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PrescriptionResponse>>
    getPrescriptionById(@PathVariable Long id) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Prescription fetched successfully",
                        prescriptionService.getPrescriptionById(id)
                )
        );
    }

    // Update Prescription
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PrescriptionResponse>>
    updatePrescription(
            @PathVariable Long id,
            @RequestBody CreatePrescriptionRequest request
    ) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Prescription updated successfully",
                        prescriptionService.updatePrescription(id, request)
                )
        );
    }

    // Delete Prescription
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>>
    deletePrescription(@PathVariable Long id) {

        prescriptionService.deletePrescription(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Prescription deleted successfully",
                        null
                )
        );
    }
}