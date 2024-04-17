package com.project.appointmentscheduler.controller;

import com.project.appointmentscheduler.dto.*;
import com.project.appointmentscheduler.entity.User;
import com.project.appointmentscheduler.error.exceptions.InvalidAppointmentException;
import com.project.appointmentscheduler.service.interfaces.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    @PutMapping("/{appointmentId}")
    public ResponseEntity<Message> updateAppointment(@PathVariable Long appointmentId, @Valid @RequestBody SaveAppointmentRequestDTO appointmentDTO){
        if(appointmentId!=appointmentDTO.getAppointmentId()) throw new InvalidAppointmentException("Mismatch in appointment Ids");
        Boolean res= appointmentService.updateAppointment(appointmentDTO);
        Message msg = new Message(HttpStatus.OK, "Appointment Updated Successfully");
        return ResponseEntity.ok(msg);
    }
    @DeleteMapping("/{appointmentId}")
    public ResponseEntity<Message> deleteAppointment(@PathVariable Long appointmentId, @AuthenticationPrincipal User loggedInUser){
        Boolean res = appointmentService.deleteAppointment(appointmentId, loggedInUser.getUserId());
        Message msg = new Message(HttpStatus.OK, "Appointment instance deleted successfully");
        return ResponseEntity.ok(msg);
    }

    @GetMapping("/users")
    public ResponseEntity<GetAllAppointmentResponseDTO> getAllAppointmentByUser(@RequestParam("scheduled-by") Long scheduledBy, @RequestParam("scheduled-with") Long scheduledWith){
        GetAllAppointmentResponseDTO appointments= appointmentService.getAllAppointmentsByUser(scheduledBy,scheduledWith);
        return ResponseEntity.ok(appointments);
    }
}
