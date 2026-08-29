package com.example.medisenseai.appointment.controller;

import com.example.medisenseai.appointment.dto.AppointmentResponse;
import com.example.medisenseai.appointment.dto.CreateAppointmentRequest;
import com.example.medisenseai.appointment.entity.AppointmentStatus;
import com.example.medisenseai.appointment.service.AppointmentService;
import com.example.medisenseai.common.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/appointments")
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {
    private final AppointmentService appointmentService;

    public AppointmentController(
            AppointmentService appointmentService
    ) {
        this.appointmentService = appointmentService;
    }

    // Create Appointment
    @PostMapping
    public ResponseEntity<ApiResponse<AppointmentResponse>>
    createAppointment(
            @RequestBody CreateAppointmentRequest request
    ) {

        AppointmentResponse appointment =
                appointmentService.createAppointment(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ApiResponse.success(
                                "Appointment created successfully",
                                appointment
                        )
                );
    }

    // Get All Appointments
    @GetMapping
    public ResponseEntity<ApiResponse<List<AppointmentResponse>>>
    getAllAppointments() {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Appointments fetched successfully",
                        appointmentService.getAllAppointments()
                )
        );
    }

    // Get Appointment By ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AppointmentResponse>>
    getAppointmentById(@PathVariable Long id) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Appointment fetched successfully",
                        appointmentService.getAppointmentById(id)
                )
        );
    }

    // Update Appointment Status
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<AppointmentResponse>>
    updateAppointmentStatus(
            @PathVariable Long id,
            @RequestParam AppointmentStatus status
    ) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Appointment status updated successfully",
                        appointmentService.updateAppointmentStatus(
                                id,
                                status
                        )
                )
        );
    }

    // Delete Appointment
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>>
    deleteAppointment(@PathVariable Long id) {

        appointmentService.deleteAppointment(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Appointment deleted successfully",
                        null
                )
        );
    }
}