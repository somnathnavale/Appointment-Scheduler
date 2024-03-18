package com.project.appointmentscheduler.controller;

import com.project.appointmentscheduler.entity.AppointmentInstance;
import com.project.appointmentscheduler.service.interfaces.AppointmentInstanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/{appointmentId}/appointment-instance")
    public ResponseEntity<AppointmentInstance> addAppointmentInstance(@PathVariable("appointmentId") Long appointmentId, @RequestBody AppointmentInstance instance){
        return null;
    }

    @GetMapping("/{appointmentId}/appointment-instance/{instanceId}")
    public ResponseEntity<AppointmentInstance> getAppointmentInstanceById(@PathVariable("appointmentId") Long appointmentId,@PathVariable("instanceId") Long instanceId){
        return ResponseEntity.ok(instanceService.getAppointmentInstanceById(appointmentId, instanceId));
    }

    @PutMapping("/{appointmentId}/appointment-instance/{instanceId}")
    public ResponseEntity<AppointmentInstance> updateAppointmentInstanceById(@PathVariable("appointmentId") Long appointmentId,@PathVariable("instanceId") Long instanceId){
        return ResponseEntity.ok(instanceService.updateAppointmentInstanceById(appointmentId, instanceId));
    }

    @DeleteMapping("/{appointmentId}/appointment-instance/{instanceId}")
    public ResponseEntity<Boolean> deleteAppointmentInstanceById(@PathVariable("appointmentId") Long appointmentId, @PathVariable("instanceId") Long instanceId){
        return ResponseEntity.ok(instanceService.deleteAppointmentInstanceById(appointmentId, instanceId));
    }

}
