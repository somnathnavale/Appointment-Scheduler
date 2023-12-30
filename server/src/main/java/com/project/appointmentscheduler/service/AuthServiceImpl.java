package com.project.appointmentscheduler.service;

import com.project.appointmentscheduler.dto.LoginRequest;
import com.project.appointmentscheduler.dto.LoginResponse;
import com.project.appointmentscheduler.entity.User;
import com.project.appointmentscheduler.repository.UserRepository;
import com.project.appointmentscheduler.service.interfaces.AuthService;
import com.project.appointmentscheduler.service.interfaces.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;

    @Override
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser=userRepository.save(user);
        return savedUser;
    }

    @Override
    public LoginResponse authenticateUser(LoginRequest loginBody) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginBody.getEmail(),loginBody.getPassword())
        );
        User user=userRepository.findByEmail(loginBody.getEmail()).orElseThrow(()->new UsernameNotFoundException("User Not Found"));
        String token= jwtService.generateToken(user);

        return LoginResponse.builder().message("User Logged In Successfully").status(HttpStatus.OK).token(token).build();
    }
}
