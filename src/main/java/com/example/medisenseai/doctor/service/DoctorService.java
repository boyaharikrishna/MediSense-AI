package com.example.medisenseai.doctor.service;

import com.example.medisenseai.department.entity.Department;
import com.example.medisenseai.department.repository.DepartmentRepository;
import com.example.medisenseai.doctor.dto.CreateDoctorRequest;
import com.example.medisenseai.doctor.dto.DoctorResponse;
import com.example.medisenseai.doctor.dto.UpdateDoctorRequest;
import com.example.medisenseai.doctor.entity.Doctor;
import com.example.medisenseai.doctor.repository.DoctorRepository;
import com.example.medisenseai.exception.DuplicateResourceException;
import com.example.medisenseai.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final DepartmentRepository departmentRepository;

    public DoctorService(
            DoctorRepository doctorRepository,
            DepartmentRepository departmentRepository
    ) {
        this.doctorRepository = doctorRepository;
        this.departmentRepository = departmentRepository;
    }

    // Create Doctor
    public DoctorResponse createDoctor(CreateDoctorRequest request) {

        // Check duplicate email
        if (doctorRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException(
                    "Doctor email already exists: " + request.getEmail()
            );
        }

        // Check duplicate phone
        if (doctorRepository.existsByPhone(request.getPhone())) {
            throw new DuplicateResourceException(
                    "Doctor phone already exists: " + request.getPhone()
            );
        }

        // Get Department using departmentId
        Department department = departmentRepository
                .findById(request.getDepartmentId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Department not found with id: "
                                        + request.getDepartmentId()
                        )
                );

        // Create Doctor object
        Doctor doctor = new Doctor();

        doctor.setName(request.getName());
        doctor.setEmail(request.getEmail());
        doctor.setPhone(request.getPhone());
        doctor.setSpecialization(request.getSpecialization());

        // IMPORTANT: Set department
        doctor.setDepartment(department);

        // Default active status
        doctor.setActive(true);

        // Save Doctor
        Doctor savedDoctor = doctorRepository.save(doctor);

        return mapToResponse(savedDoctor);
    }


    // Get All Doctors
    public List<DoctorResponse> getAllDoctors() {

        return doctorRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // Get Doctor By ID
    public DoctorResponse getDoctorById(Long id) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id: " + id
                        )
                );

        return mapToResponse(doctor);
    }


    // Update Doctor
    public DoctorResponse updateDoctor(
            Long id,
            UpdateDoctorRequest request
    ) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id: " + id
                        )
                );

        // Check email duplicate
        doctorRepository.findByEmail(request.getEmail())
                .ifPresent(existingDoctor -> {
                    if (!existingDoctor.getId().equals(id)) {
                        throw new DuplicateResourceException(
                                "Doctor email already exists: "
                                        + request.getEmail()
                        );
                    }
                });

        // Check phone duplicate
        doctorRepository.findByPhone(request.getPhone())
                .ifPresent(existingDoctor -> {
                    if (!existingDoctor.getId().equals(id)) {
                        throw new DuplicateResourceException(
                                "Doctor phone already exists: "
                                        + request.getPhone()
                        );
                    }
                });

        // Update fields
        doctor.setName(request.getName());
        doctor.setEmail(request.getEmail());
        doctor.setPhone(request.getPhone());
        doctor.setSpecialization(request.getSpecialization());

        Doctor updatedDoctor = doctorRepository.save(doctor);

        return mapToResponse(updatedDoctor);
    }


    // Activate / Deactivate Doctor
    public DoctorResponse updateDoctorStatus(
            Long id,
            boolean active
    ) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id: " + id
                        )
                );

        doctor.setActive(active);

        Doctor updatedDoctor = doctorRepository.save(doctor);

        return mapToResponse(updatedDoctor);
    }


    // Delete Doctor
    public void deleteDoctor(Long id) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id: " + id
                        )
                );

        doctorRepository.delete(doctor);
    }


    // Convert Doctor Entity to DoctorResponse
    private DoctorResponse mapToResponse(Doctor doctor) {

        return new DoctorResponse(
                doctor.getId(),
                doctor.getName(),
                doctor.getEmail(),
                doctor.getPhone(),
                doctor.getSpecialization(),
                doctor.getDepartment().getId(),
                doctor.isActive()
        );
    }
}