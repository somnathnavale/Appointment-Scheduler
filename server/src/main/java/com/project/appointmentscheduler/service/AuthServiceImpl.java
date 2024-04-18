package com.project.appointmentscheduler.service;

import com.project.appointmentscheduler.dto.ChangePasswordDTO;
import com.project.appointmentscheduler.dto.LoginRequest;
import com.project.appointmentscheduler.dto.LoginResponse;
import com.project.appointmentscheduler.dto.UserDTO;
import com.project.appointmentscheduler.entity.User;
import com.project.appointmentscheduler.repository.UserRepository;
import com.project.appointmentscheduler.service.interfaces.AuthService;
import com.project.appointmentscheduler.service.interfaces.EmailService;
import com.project.appointmentscheduler.service.interfaces.JwtService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private EmailService emailService;

    @Override
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser=userRepository.save(user);

        emailService.sendUserRegistrationEmail(user.getEmail(), user.getFirstname()+" "+user.getLastname());
        return savedUser;
    }

    @Override
    public LoginResponse authenticateUser(LoginRequest loginBody) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginBody.getEmail(),loginBody.getPassword())
        );
        User user=userRepository.findByEmail(loginBody.getEmail()).orElseThrow(()->new UsernameNotFoundException("User Not Found"));
        String token= jwtService.generateToken(user);

        return LoginResponse.builder().token(token).firstname(user.getFirstname()).lastname(user.getLastname()).email(user.getEmail()).userId(user.getUserId()).build();
    }

    @Override
    public void changePassword(ChangePasswordDTO passwordDTO) {
        User user = userRepository.findById(passwordDTO.getUserId()).orElseThrow(() -> new EntityNotFoundException("User not found with given Id: "+ passwordDTO.getUserId()));

        user.setPassword(passwordEncoder.encode(passwordDTO.getPassword()));
        userRepository.save(user);
    }
}
