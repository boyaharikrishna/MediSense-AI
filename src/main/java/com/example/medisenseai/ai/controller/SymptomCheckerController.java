package com.example.medisenseai.ai.controller;

import com.example.medisenseai.ai.dto.SymptomRequest;
import com.example.medisenseai.ai.dto.SymptomResponse;
import com.example.medisenseai.ai.service.SymptomCheckerService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:5174")
public class SymptomCheckerController {

    private final SymptomCheckerService symptomCheckerService;

    public SymptomCheckerController(
            SymptomCheckerService symptomCheckerService
    ) {
        this.symptomCheckerService = symptomCheckerService;
    }

    @PostMapping("/symptom-checker")
    public ResponseEntity<SymptomResponse> checkSymptoms(
            @RequestBody SymptomRequest request
    ) {

        SymptomResponse response =
                symptomCheckerService.checkSymptoms(
                        request.getSymptoms()
                );

        return ResponseEntity.ok(response);
    }
}