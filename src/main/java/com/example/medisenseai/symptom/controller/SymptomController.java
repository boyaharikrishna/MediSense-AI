package com.example.medisenseai.symptom.controller;

import com.example.medisenseai.symptom.dto.SymptomRequest;
import com.example.medisenseai.symptom.dto.SymptomResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/symptoms")
public class SymptomController {

    @PostMapping("/check")
    public ResponseEntity<SymptomResponse> checkSymptoms(
            @RequestBody SymptomRequest request
    ) {

        String symptoms = request.getSymptoms();

        if (symptoms == null || symptoms.trim().isEmpty()) {

            return ResponseEntity.badRequest().build();

        }

        String analysis =
                "Based on the symptoms you entered: " +
                        symptoms +
                        ". Please note that this is only a preliminary analysis and not a medical diagnosis. " +
                        "For an accurate diagnosis and treatment, please consult a qualified healthcare professional.";

        SymptomResponse response =
                new SymptomResponse(analysis);

        return ResponseEntity.ok(response);
    }
}