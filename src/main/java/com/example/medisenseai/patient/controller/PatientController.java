package com.example.medisenseai.patient.controller;

import com.example.medisenseai.common.response.ApiResponse;
import com.example.medisenseai.patient.dto.CreatePatientRequest;
import com.example.medisenseai.patient.dto.PatientResponse;
import com.example.medisenseai.patient.dto.UpdatePatientRequest;
import com.example.medisenseai.patient.service.PatientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/api/v1/patients")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PatientResponse>> createPatient(
            @RequestBody CreatePatientRequest request
    ) {

        PatientResponse patient =
                patientService.createPatient(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Patient created successfully",
                        patient
                ));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<PatientResponse>>> getAllPatients() {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Patients fetched successfully",
                        patientService.getAllPatients()
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PatientResponse>> getPatientById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Patient fetched successfully",
                        patientService.getPatientById(id)
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PatientResponse>> updatePatient(
            @PathVariable Long id,
            @RequestBody UpdatePatientRequest request
    ) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Patient updated successfully",
                        patientService.updatePatient(id, request)
                )
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<PatientResponse>> updatePatientStatus(
            @PathVariable Long id,
            @RequestParam boolean active
    ) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Patient status updated successfully",
                        patientService.updatePatientStatus(id, active)
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePatient(
            @PathVariable Long id
    ) {

        patientService.deletePatient(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Patient deleted successfully",
                        null
                )
        );
    }
}