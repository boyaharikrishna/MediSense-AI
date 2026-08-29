package com.example.medisenseai.medicalrecord.dto;

import java.time.LocalDateTime;

public class MedicalRecordResponse {

    private Long id;

    private Long patientId;
    private String patientName;

    private Long doctorId;
    private String doctorName;

    private String diagnosis;
    private String symptoms;
    private String prescription;
    private String notes;
    private LocalDateTime recordDate;

    public MedicalRecordResponse(
            Long id,
            Long patientId,
            String patientName,
            Long doctorId,
            String doctorName,
            String diagnosis,
            String symptoms,
            String prescription,
            String notes,
            LocalDateTime recordDate
    ) {
        this.id = id;
        this.patientId = patientId;
        this.patientName = patientName;
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.diagnosis = diagnosis;
        this.symptoms = symptoms;
        this.prescription = prescription;
        this.notes = notes;
        this.recordDate = recordDate;
    }

    public Long getId() {
        return id;
    }

    public Long getPatientId() {
        return patientId;
    }

    public String getPatientName() {
        return patientName;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public String getPrescription() {
        return prescription;
    }

    public String getNotes() {
        return notes;
    }

    public LocalDateTime getRecordDate() {
        return recordDate;
    }
}