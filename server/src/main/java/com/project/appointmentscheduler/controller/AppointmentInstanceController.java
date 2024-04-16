package com.project.appointmentscheduler.controller;

import com.project.appointmentscheduler.dto.Message;
import com.project.appointmentscheduler.dto.UpdateAppointmentInstanceDTO;
import com.project.appointmentscheduler.entity.AppointmentInstance;
import com.project.appointmentscheduler.entity.User;
import com.project.appointmentscheduler.service.interfaces.AppointmentInstanceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentInstanceController {

    @Autowired
    private AppointmentInstanceService instanceService;

    @GetMapping("/{appointmentId}/appointment-instance")
    public ResponseEntity<List<AppointmentInstance>> getAllAppointmentInstanceByAppointmentId(@PathVariable("appointmentId") Long appointmentId){
        return ResponseEntity.ok(instanceService.getAllAppointmentInstanceByAppointmentId(appointmentId));
    }

    @GetMapping("/{appointmentId}/appointment-instance/{instanceId}")
    public ResponseEntity<AppointmentInstance> getAppointmentInstanceById(@PathVariable("appointmentId") Long appointmentId,@PathVariable("instanceId") Long instanceId){
        return ResponseEntity.ok(instanceService.getAppointmentInstanceById(appointmentId, instanceId));
    }

    @PutMapping("/{appointmentId}/appointment-instance/{instanceId}")
    public ResponseEntity<Message> updateAppointmentInstanceById(@PathVariable("appointmentId") Long appointmentId, @PathVariable("instanceId") Long instanceId, @RequestBody @Valid UpdateAppointmentInstanceDTO appointmentInstanceDTO
            , @AuthenticationPrincipal User loggedInUser){
        boolean res = instanceService.updateAppointmentInstanceById(appointmentId, instanceId, appointmentInstanceDTO, loggedInUser.getUserId());
        Message msg = new Message(HttpStatus.OK, "Appointment instance updated successfully");
        return ResponseEntity.ok(msg);
    }

    @DeleteMapping("/{appointmentId}/appointment-instance/{instanceId}")
    public ResponseEntity<Message> deleteAppointmentInstanceById(@PathVariable("appointmentId") Long appointmentId, @PathVariable("instanceId") Long instanceId, @AuthenticationPrincipal User loggedInUser){
        boolean res = instanceService.deleteAppointmentInstanceById(appointmentId, instanceId, loggedInUser.getUserId());
        Message msg = new Message(HttpStatus.OK, "Appointment instance deleted successfully");
        return ResponseEntity.ok(msg);
    }

}
