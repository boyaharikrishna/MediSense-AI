package com.example.medisenseai.appointment.service;

import com.example.medisenseai.appointment.dto.AppointmentResponse;
import com.example.medisenseai.appointment.dto.CreateAppointmentRequest;
import com.example.medisenseai.appointment.entity.Appointment;
import com.example.medisenseai.appointment.entity.AppointmentStatus;
import com.example.medisenseai.appointment.repository.AppointmentRepository;
import com.example.medisenseai.doctor.entity.Doctor;
import com.example.medisenseai.doctor.repository.DoctorRepository;
import com.example.medisenseai.exception.ResourceNotFoundException;
import com.example.medisenseai.patient.entity.Patient;
import com.example.medisenseai.patient.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentService(
            AppointmentRepository appointmentRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository
    ) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    // Create Appointment
    public AppointmentResponse createAppointment(
            CreateAppointmentRequest request
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

        Appointment appointment = new Appointment();

        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDateTime(
                request.getAppointmentDateTime()
        );
        appointment.setReason(request.getReason());
        appointment.setStatus(AppointmentStatus.SCHEDULED);

        Appointment savedAppointment =
                appointmentRepository.save(appointment);

        return mapToResponse(savedAppointment);
    }

    // Get All Appointments
    public List<AppointmentResponse> getAllAppointments() {

        return appointmentRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Get Appointment By ID
    public AppointmentResponse getAppointmentById(Long id) {

        return mapToResponse(getAppointment(id));
    }

    // Update Appointment Status
    public AppointmentResponse updateAppointmentStatus(
            Long id,
            AppointmentStatus status
    ) {

        Appointment appointment = getAppointment(id);

        appointment.setStatus(status);

        Appointment updatedAppointment =
                appointmentRepository.save(appointment);

        return mapToResponse(updatedAppointment);
    }

    // Delete Appointment
    public void deleteAppointment(Long id) {

        Appointment appointment = getAppointment(id);

        appointmentRepository.delete(appointment);
    }

    private Appointment getAppointment(Long id) {

        return appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Appointment not found with id: " + id
                        )
                );
    }

    private AppointmentResponse mapToResponse(
            Appointment appointment
    ) {

        return new AppointmentResponse(
                appointment.getId(),
                appointment.getPatient().getId(),
                appointment.getPatient().getName(),
                appointment.getDoctor().getId(),
                appointment.getDoctor().getName(),
                appointment.getAppointmentDateTime(),
                appointment.getReason(),
                appointment.getStatus()
        );
    }
}