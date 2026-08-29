package com.example.medisenseai.patient.service;

import com.example.medisenseai.exception.DuplicateResourceException;
import com.example.medisenseai.exception.ResourceNotFoundException;
import com.example.medisenseai.patient.dto.CreatePatientRequest;
import com.example.medisenseai.patient.dto.PatientResponse;
import com.example.medisenseai.patient.dto.UpdatePatientRequest;
import com.example.medisenseai.patient.entity.Patient;
import com.example.medisenseai.patient.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public PatientResponse createPatient(CreatePatientRequest request) {

        if (patientRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException(
                    "Patient email already exists: " + request.getEmail()
            );
        }

        if (patientRepository.existsByPhone(request.getPhone())) {
            throw new DuplicateResourceException(
                    "Patient phone already exists: " + request.getPhone()
            );
        }

        Patient patient = new Patient();

        patient.setName(request.getName());
        patient.setEmail(request.getEmail());
        patient.setPhone(request.getPhone());
        patient.setGender(request.getGender());
        patient.setDateOfBirth(request.getDateOfBirth());
        patient.setActive(true);

        return mapToResponse(patientRepository.save(patient));
    }

    public List<PatientResponse> getAllPatients() {
        return patientRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public PatientResponse getPatientById(Long id) {
        return mapToResponse(getPatient(id));
    }

    public PatientResponse updatePatient(
            Long id,
            UpdatePatientRequest request
    ) {

        Patient patient = getPatient(id);

        patientRepository.findByEmail(request.getEmail())
                .ifPresent(foundPatient -> {
                    if (!foundPatient.getId().equals(id)) {
                        throw new DuplicateResourceException(
                                "Patient email already exists: "
                                        + request.getEmail()
                        );
                    }
                });

        patientRepository.findByPhone(request.getPhone())
                .ifPresent(foundPatient -> {
                    if (!foundPatient.getId().equals(id)) {
                        throw new DuplicateResourceException(
                                "Patient phone already exists: "
                                        + request.getPhone()
                        );
                    }
                });

        patient.setName(request.getName());
        patient.setEmail(request.getEmail());
        patient.setPhone(request.getPhone());
        patient.setGender(request.getGender());
        patient.setDateOfBirth(request.getDateOfBirth());
        patient.setActive(request.isActive());

        return mapToResponse(patientRepository.save(patient));
    }

    public PatientResponse updatePatientStatus(Long id, boolean active) {

        Patient patient = getPatient(id);

        patient.setActive(active);

        return mapToResponse(patientRepository.save(patient));
    }

    public void deletePatient(Long id) {

        Patient patient = getPatient(id);

        patientRepository.delete(patient);
    }

    private Patient getPatient(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with id: " + id
                        )
                );
    }

    private PatientResponse mapToResponse(Patient patient) {

        return new PatientResponse(
                patient.getId(),
                patient.getName(),
                patient.getEmail(),
                patient.getPhone(),
                patient.getGender(),
                patient.getDateOfBirth(),
                patient.isActive()
        );
    }
}