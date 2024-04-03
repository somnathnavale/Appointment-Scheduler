package com.project.appointmentscheduler.controller;

import com.project.appointmentscheduler.dto.GetAllAppointmentResponseDTO;
import com.project.appointmentscheduler.dto.GetAppointmentResponseDTO;
import com.project.appointmentscheduler.dto.SaveAppointmentRequestDTO;
import com.project.appointmentscheduler.service.interfaces.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/")
    public ResponseEntity<List<GetAppointmentResponseDTO>> getAllAppointments(){
        List<GetAppointmentResponseDTO> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }

    @PostMapping("/")
    public ResponseEntity<GetAppointmentResponseDTO> saveAppointment(@Valid @RequestBody SaveAppointmentRequestDTO saveAppointmentRequestDTO){
        GetAppointmentResponseDTO appointment= appointmentService.saveAppointment(saveAppointmentRequestDTO);
        return ResponseEntity.ok(appointment);
    }

    @GetMapping("/users")
    public ResponseEntity<GetAllAppointmentResponseDTO> getAllAppointmentByUser(@RequestParam("scheduled-by") Long scheduledBy, @RequestParam("scheduled-with") Long scheduledWith){
        GetAllAppointmentResponseDTO appointments= appointmentService.getAllAppointmentsByUser(scheduledBy,scheduledWith);
        return ResponseEntity.ok(appointments);
    }
}
