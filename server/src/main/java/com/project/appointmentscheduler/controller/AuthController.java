package com.project.appointmentscheduler.controller;

import com.project.appointmentscheduler.dto.LoginRequest;
import com.project.appointmentscheduler.dto.LoginResponse;
import com.project.appointmentscheduler.dto.Message;
import com.project.appointmentscheduler.entity.User;
import com.project.appointmentscheduler.service.interfaces.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Message> registerUser(@RequestBody @Valid User user){
        authService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(new Message(HttpStatus.CREATED,"User Registered Successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticateUser(@RequestBody LoginRequest loginBody){
        LoginResponse response=authService.authenticateUser(loginBody);
        return ResponseEntity.ok(response);
    }
}
