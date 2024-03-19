package com.project.appointmentscheduler.controller;

import com.project.appointmentscheduler.dto.MeetStatsProjection;
import com.project.appointmentscheduler.service.interfaces.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api/common")
public class commonController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/meet-stats")
    public ResponseEntity<List<MeetStatsProjection>> getMeetStats(){
        List<MeetStatsProjection> stats =  appointmentService.getMeetStats();
        return ResponseEntity.ok(stats);
    }
}
