package com.example.medisenseai.symptom.dto;

public class SymptomResponse {

    private String analysis;

    public SymptomResponse() {
    }

    public SymptomResponse(String analysis) {
        this.analysis = analysis;
    }

    public String getAnalysis() {
        return analysis;
    }

    public void setAnalysis(String analysis) {
        this.analysis = analysis;
    }
}