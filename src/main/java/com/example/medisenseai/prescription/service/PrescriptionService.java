package com.example.medisenseai.prescription.service;

import com.example.medisenseai.doctor.entity.Doctor;
import com.example.medisenseai.doctor.repository.DoctorRepository;
import com.example.medisenseai.exception.ResourceNotFoundException;
import com.example.medisenseai.patient.entity.Patient;
import com.example.medisenseai.patient.repository.PatientRepository;
import com.example.medisenseai.prescription.dto.CreatePrescriptionRequest;
import com.example.medisenseai.prescription.dto.PrescriptionResponse;
import com.example.medisenseai.prescription.entity.Prescription;
import com.example.medisenseai.prescription.repository.PrescriptionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public PrescriptionService(
            PrescriptionRepository prescriptionRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository
    ) {
        this.prescriptionRepository = prescriptionRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    // Create Prescription
    public PrescriptionResponse createPrescription(
            CreatePrescriptionRequest request
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

        Prescription prescription = new Prescription();

        prescription.setPatient(patient);
        prescription.setDoctor(doctor);
        prescription.setMedicineName(request.getMedicineName());
        prescription.setDosage(request.getDosage());
        prescription.setFrequency(request.getFrequency());
        prescription.setDuration(request.getDuration());
        prescription.setInstructions(request.getInstructions());
        prescription.setPrescribedDate(request.getPrescribedDate());

        Prescription savedPrescription =
                prescriptionRepository.save(prescription);

        return mapToResponse(savedPrescription);
    }

    // Get All Prescriptions
    public List<PrescriptionResponse> getAllPrescriptions() {

        return prescriptionRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Get Prescription By ID
    public PrescriptionResponse getPrescriptionById(Long id) {

        return mapToResponse(getPrescription(id));
    }

    // Update Prescription
    public PrescriptionResponse updatePrescription(
            Long id,
            CreatePrescriptionRequest request
    ) {

        Prescription prescription = getPrescription(id);

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

        prescription.setPatient(patient);
        prescription.setDoctor(doctor);
        prescription.setMedicineName(request.getMedicineName());
        prescription.setDosage(request.getDosage());
        prescription.setFrequency(request.getFrequency());
        prescription.setDuration(request.getDuration());
        prescription.setInstructions(request.getInstructions());
        prescription.setPrescribedDate(request.getPrescribedDate());

        Prescription updatedPrescription =
                prescriptionRepository.save(prescription);

        return mapToResponse(updatedPrescription);
    }

    // Delete Prescription
    public void deletePrescription(Long id) {

        Prescription prescription = getPrescription(id);

        prescriptionRepository.delete(prescription);
    }

    private Prescription getPrescription(Long id) {

        return prescriptionRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Prescription not found with id: " + id
                        )
                );
    }

    private PrescriptionResponse mapToResponse(
            Prescription prescription
    ) {

        return new PrescriptionResponse(
                prescription.getId(),
                prescription.getPatient().getId(),
                prescription.getPatient().getName(),
                prescription.getDoctor().getId(),
                prescription.getDoctor().getName(),
                prescription.getMedicineName(),
                prescription.getDosage(),
                prescription.getFrequency(),
                prescription.getDuration(),
                prescription.getInstructions(),
                prescription.getPrescribedDate()
        );
    }
}