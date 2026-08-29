package com.example.medisenseai.medicalrecord.service;

import com.example.medisenseai.doctor.entity.Doctor;
import com.example.medisenseai.doctor.repository.DoctorRepository;
import com.example.medisenseai.exception.ResourceNotFoundException;
import com.example.medisenseai.medicalrecord.dto.CreateMedicalRecordRequest;
import com.example.medisenseai.medicalrecord.dto.MedicalRecordResponse;
import com.example.medisenseai.medicalrecord.entity.MedicalRecord;
import com.example.medisenseai.medicalrecord.repository.MedicalRecordRepository;
import com.example.medisenseai.patient.entity.Patient;
import com.example.medisenseai.patient.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public MedicalRecordService(
            MedicalRecordRepository medicalRecordRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository
    ) {
        this.medicalRecordRepository = medicalRecordRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }


    // =========================================
    // CREATE MEDICAL RECORD
    // =========================================

    public MedicalRecordResponse createMedicalRecord(
            CreateMedicalRecordRequest request
    ) {

        Patient patient = patientRepository
                .findById(request.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with id: "
                                        + request.getPatientId()
                        )
                );

        Doctor doctor = doctorRepository
                .findById(request.getDoctorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id: "
                                        + request.getDoctorId()
                        )
                );

        MedicalRecord medicalRecord = new MedicalRecord();

        medicalRecord.setPatient(patient);
        medicalRecord.setDoctor(doctor);
        medicalRecord.setDiagnosis(request.getDiagnosis());
        medicalRecord.setSymptoms(request.getSymptoms());
        medicalRecord.setPrescription(request.getPrescription());
        medicalRecord.setNotes(request.getNotes());
        medicalRecord.setRecordDate(request.getRecordDate());

        MedicalRecord savedRecord =
                medicalRecordRepository.save(medicalRecord);

        return mapToResponse(savedRecord);
    }


    // =========================================
    // GET ALL MEDICAL RECORDS
    // =========================================

    public List<MedicalRecordResponse> getAllMedicalRecords() {

        return medicalRecordRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================
    // GET MEDICAL RECORD BY ID
    // =========================================

    public MedicalRecordResponse getMedicalRecordById(Long id) {

        return mapToResponse(getMedicalRecord(id));
    }


    // =========================================
    // UPDATE MEDICAL RECORD
    // =========================================

    public MedicalRecordResponse updateMedicalRecord(
            Long id,
            CreateMedicalRecordRequest request
    ) {

        MedicalRecord medicalRecord =
                getMedicalRecord(id);


        Patient patient = patientRepository
                .findById(request.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with id: "
                                        + request.getPatientId()
                        )
                );


        Doctor doctor = doctorRepository
                .findById(request.getDoctorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id: "
                                        + request.getDoctorId()
                        )
                );


        medicalRecord.setPatient(patient);
        medicalRecord.setDoctor(doctor);
        medicalRecord.setDiagnosis(request.getDiagnosis());
        medicalRecord.setSymptoms(request.getSymptoms());
        medicalRecord.setPrescription(request.getPrescription());
        medicalRecord.setNotes(request.getNotes());
        medicalRecord.setRecordDate(request.getRecordDate());


        MedicalRecord updatedRecord =
                medicalRecordRepository.save(
                        medicalRecord
                );


        return mapToResponse(updatedRecord);
    }


    // =========================================
    // DELETE MEDICAL RECORD
    // =========================================

    public void deleteMedicalRecord(Long id) {

        MedicalRecord medicalRecord =
                getMedicalRecord(id);

        medicalRecordRepository.delete(
                medicalRecord
        );
    }


    // =========================================
    // GET ENTITY BY ID
    // =========================================

    private MedicalRecord getMedicalRecord(
            Long id
    ) {

        return medicalRecordRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Medical record not found with id: "
                                        + id
                        )
                );
    }


    // =========================================
    // MAP ENTITY TO RESPONSE
    // =========================================

    private MedicalRecordResponse mapToResponse(
            MedicalRecord medicalRecord
    ) {

        return new MedicalRecordResponse(
                medicalRecord.getId(),

                medicalRecord.getPatient().getId(),

                medicalRecord.getPatient().getName(),

                medicalRecord.getDoctor().getId(),

                medicalRecord.getDoctor().getName(),

                medicalRecord.getDiagnosis(),

                medicalRecord.getSymptoms(),

                medicalRecord.getPrescription(),

                medicalRecord.getNotes(),

                medicalRecord.getRecordDate()
        );
    }
}