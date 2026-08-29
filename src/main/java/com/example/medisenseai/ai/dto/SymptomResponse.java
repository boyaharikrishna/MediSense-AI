package com.example.medisenseai.ai.dto;

public class SymptomResponse {

    private String possibleCondition;
    private String recommendedDepartment;
    private String severity;
    private String advice;

    public SymptomResponse(
            String possibleCondition,
            String recommendedDepartment,
            String severity,
            String advice
    ) {
        this.possibleCondition = possibleCondition;
        this.recommendedDepartment = recommendedDepartment;
        this.severity = severity;
        this.advice = advice;
    }

    public String getPossibleCondition() {
        return possibleCondition;
    }

    public String getRecommendedDepartment() {
        return recommendedDepartment;
    }

    public String getSeverity() {
        return severity;
    }

    public String getAdvice() {
        return advice;
    }
}