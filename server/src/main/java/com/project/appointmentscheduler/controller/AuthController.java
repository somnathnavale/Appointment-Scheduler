package com.project.appointmentscheduler.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.appointmentscheduler.dto.*;
import com.project.appointmentscheduler.entity.User;
import com.project.appointmentscheduler.error.exceptions.ForbiddenAccessException;
import com.project.appointmentscheduler.service.interfaces.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    @PutMapping("/{id}/change-password")
    public ResponseEntity<Message> changePassword(@PathVariable("id") Long userId, @RequestBody ChangePasswordDTO passwordDTO, @AuthenticationPrincipal  User loggedInUser){
        if(loggedInUser==null || userId!=passwordDTO.getUserId() || userId!= loggedInUser.getUserId())
            throw new ForbiddenAccessException("Access Denied To Update User");

       authService.changePassword(passwordDTO);
        Message message=new Message(HttpStatus.OK,"Password Updated Successfully");
        return ResponseEntity.ok(message);
    }

}
