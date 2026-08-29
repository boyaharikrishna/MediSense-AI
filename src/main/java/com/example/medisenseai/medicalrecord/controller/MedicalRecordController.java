package com.example.medisenseai.medicalrecord.controller;

import com.example.medisenseai.common.response.ApiResponse;
import com.example.medisenseai.medicalrecord.dto.CreateMedicalRecordRequest;
import com.example.medisenseai.medicalrecord.dto.MedicalRecordResponse;
import com.example.medisenseai.medicalrecord.service.MedicalRecordService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/medical-records")
@CrossOrigin(origins = "http://localhost:5173")
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    public MedicalRecordController(
            MedicalRecordService medicalRecordService
    ) {
        this.medicalRecordService =
                medicalRecordService;
    }


    // =========================================
    // CREATE MEDICAL RECORD
    // =========================================

    @PostMapping
    public ResponseEntity<ApiResponse<MedicalRecordResponse>>
    createMedicalRecord(
            @RequestBody CreateMedicalRecordRequest request
    ) {

        MedicalRecordResponse medicalRecord =
                medicalRecordService
                        .createMedicalRecord(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ApiResponse.success(
                                "Medical record created successfully",
                                medicalRecord
                        )
                );
    }


    // =========================================
    // GET ALL MEDICAL RECORDS
    // =========================================

    @GetMapping
    public ResponseEntity<
            ApiResponse<List<MedicalRecordResponse>>
            >
    getAllMedicalRecords() {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Medical records fetched successfully",
                        medicalRecordService
                                .getAllMedicalRecords()
                )
        );
    }


    // =========================================
    // GET MEDICAL RECORD BY ID
    // =========================================

    @GetMapping("/{id}")
    public ResponseEntity<
            ApiResponse<MedicalRecordResponse>
            >
    getMedicalRecordById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Medical record fetched successfully",
                        medicalRecordService
                                .getMedicalRecordById(id)
                )
        );
    }


    // =========================================
    // UPDATE MEDICAL RECORD
    // =========================================

    @PutMapping("/{id}")
    public ResponseEntity<
            ApiResponse<MedicalRecordResponse>
            >
    updateMedicalRecord(
            @PathVariable Long id,
            @RequestBody CreateMedicalRecordRequest request
    ) {

        MedicalRecordResponse updatedRecord =
                medicalRecordService
                        .updateMedicalRecord(
                                id,
                                request
                        );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Medical record updated successfully",
                        updatedRecord
                )
        );
    }


    // =========================================
    // DELETE MEDICAL RECORD
    // =========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>>
    deleteMedicalRecord(
            @PathVariable Long id
    ) {

        medicalRecordService
                .deleteMedicalRecord(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Medical record deleted successfully",
                        null
                )
        );
    }
}