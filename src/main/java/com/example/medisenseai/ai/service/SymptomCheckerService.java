package com.example.medisenseai.ai.service;

import com.example.medisenseai.ai.dto.SymptomResponse;

import org.springframework.stereotype.Service;

@Service
public class SymptomCheckerService {

    public SymptomResponse checkSymptoms(String symptoms) {

        String lowerSymptoms = symptoms.toLowerCase();

        String possibleCondition;
        String recommendedDepartment;
        String severity;
        String advice;

        if (lowerSymptoms.contains("fever")
                && lowerSymptoms.contains("headache")) {

            possibleCondition = "Possible Viral Infection or Flu";
            recommendedDepartment = "General Medicine";
            severity = "Moderate";

            advice = "Take adequate rest, drink plenty of fluids, and consult a doctor if symptoms continue or worsen.";

        } else if (lowerSymptoms.contains("cough")
                && lowerSymptoms.contains("fever")) {

            possibleCondition = "Possible Respiratory Infection";
            recommendedDepartment = "Pulmonology";
            severity = "Moderate";

            advice = "Stay hydrated and consult a doctor.";

        } else if (lowerSymptoms.contains("stomach")
                || lowerSymptoms.contains("abdominal")
                || lowerSymptoms.contains("vomiting")) {

            possibleCondition = "Possible Digestive Problem";
            recommendedDepartment = "Gastroenterology";
            severity = "Moderate";

            advice = "Avoid heavy food and consult a doctor if symptoms continue.";

        } else if (lowerSymptoms.contains("chest pain")) {

            possibleCondition = "Possible Cardiac Issue";
            recommendedDepartment = "Cardiology";
            severity = "High";

            advice = "Please seek immediate medical attention.";

        } else {

            possibleCondition = "Unable to Determine Condition";
            recommendedDepartment = "General Medicine";
            severity = "Unknown";

            advice = "Please consult a healthcare professional for proper diagnosis.";
        }

        return new SymptomResponse(
                possibleCondition,
                recommendedDepartment,
                severity,
                advice
        );
    }
}