package com.example.medisenseai.prescription.dto;

import java.time.LocalDateTime;

public class PrescriptionResponse {

    private Long id;

    private Long patientId;
    private String patientName;

    private Long doctorId;
    private String doctorName;

    private String medicineName;
    private String dosage;
    private String frequency;
    private String duration;
    private String instructions;
    private LocalDateTime prescribedDate;

    public PrescriptionResponse(
            Long id,
            Long patientId,
            String patientName,
            Long doctorId,
            String doctorName,
            String medicineName,
            String dosage,
            String frequency,
            String duration,
            String instructions,
            LocalDateTime prescribedDate
    ) {
        this.id = id;
        this.patientId = patientId;
        this.patientName = patientName;
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.medicineName = medicineName;
        this.dosage = dosage;
        this.frequency = frequency;
        this.duration = duration;
        this.instructions = instructions;
        this.prescribedDate = prescribedDate;
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

    public String getMedicineName() {
        return medicineName;
    }

    public String getDosage() {
        return dosage;
    }

    public String getFrequency() {
        return frequency;
    }

    public String getDuration() {
        return duration;
    }

    public String getInstructions() {
        return instructions;
    }

    public LocalDateTime getPrescribedDate() {
        return prescribedDate;
    }
}