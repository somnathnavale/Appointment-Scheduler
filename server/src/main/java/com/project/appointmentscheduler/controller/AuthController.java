package com.project.appointmentscheduler.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.appointmentscheduler.dto.*;
import com.project.appointmentscheduler.entity.User;
import com.project.appointmentscheduler.entity.UserOTP;
import com.project.appointmentscheduler.error.exceptions.ForbiddenAccessException;
import com.project.appointmentscheduler.service.interfaces.AuthService;
import com.project.appointmentscheduler.service.interfaces.UserOTPService;
import com.project.appointmentscheduler.service.interfaces.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

    @PostMapping("/forgot-password/email")
    public ResponseEntity<Message> forgotPasswordEmailValidate( @RequestBody Map<String,String> request){
        String email=request.get("email");

        authService.emailValidateAndGenerateOTP(email);

        Message message=new Message(HttpStatus.OK,"OTP Send Successfully");
        return ResponseEntity.ok(message);
    }

    @PostMapping("/forgot-password/otp")
    public ResponseEntity<Message> forgotPasswordOTPValidate( @RequestBody Map<String,String> request){
        int otp = Integer.parseInt(request.get("otp"));
        String email = request.get("email");

        authService.otpValidate(email, otp);

        Message message=new Message(HttpStatus.OK,"OTP Validated Successfully");
        return ResponseEntity.ok(message);
    }

    @PostMapping("/forgot-password/reset")
    public ResponseEntity<Message> forgotPasswordResetPassword( @RequestBody Map<String,String> request){
        int otp = Integer.parseInt(request.get("otp"));
        String email = request.get("email");
        String password = request.get("password");

        authService.resetPassword(email, password, otp);

        Message message=new Message(HttpStatus.OK,"Password Changed Successfully");
        return ResponseEntity.ok(message);
    }
}
