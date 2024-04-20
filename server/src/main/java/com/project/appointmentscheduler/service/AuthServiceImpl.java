package com.project.appointmentscheduler.service;

import com.project.appointmentscheduler.dto.ChangePasswordDTO;
import com.project.appointmentscheduler.dto.LoginRequest;
import com.project.appointmentscheduler.dto.LoginResponse;
import com.project.appointmentscheduler.entity.User;
import com.project.appointmentscheduler.entity.UserOTP;
import com.project.appointmentscheduler.error.exceptions.InvalidOTPException;
import com.project.appointmentscheduler.repository.UserRepository;
import com.project.appointmentscheduler.service.interfaces.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

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
    private UserOTPService userOTPService;

    @Autowired
    private UserService userService;
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
        User user=userService.findUserByEmail(loginBody.getEmail());
        String token= jwtService.generateToken(user);

        return LoginResponse.builder().token(token).firstname(user.getFirstname()).lastname(user.getLastname()).email(user.getEmail()).userId(user.getUserId()).build();
    }

    @Override
    public void changePassword(ChangePasswordDTO passwordDTO) {
        User user = userRepository.findById(passwordDTO.getUserId()).orElseThrow(() -> new EntityNotFoundException("User not found with given Id: "+ passwordDTO.getUserId()));

        user.setPassword(passwordEncoder.encode(passwordDTO.getPassword()));
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void emailValidateAndGenerateOTP(String email) {
        User user = userService.findUserByEmail(email);
        UserOTP userOTP = userOTPService.getUserOTP(user.getUserId());

        Random random = new Random();
        int randomNumber = random.nextInt(900000) + 100000;

        if(userOTP==null){
            userOTP = new UserOTP();
            userOTP.setUser(user);
        }

        userOTP.setOTP(randomNumber);
        userOTP.setExpiryTime(LocalDateTime.now().plusMinutes(15));

        userOTPService.saveOTP(userOTP);
        emailService.sendEmailsForOTP(user.getFirstname()+" "+user.getLastname(),user.getEmail(), userOTP.getOTP());
    }

    @Override
    public UserOTP otpValidate(String email, int otp) {
        User user = userService.findUserByEmail(email);

        UserOTP userOTP = userOTPService.getUserOTP(user.getUserId());
        if(userOTP==null)
            throw new EntityNotFoundException("Invalid password change request");

        if(userOTP.getOTP()!=otp)
            throw new InvalidOTPException("Invalid OTP submitted");

        if( userOTP.getExpiryTime().isBefore(LocalDateTime.now()))
            throw new InvalidOTPException("OTP Expired Please try again");

        return userOTP;
    }

    @Transactional
    @Override
    public void resetPassword(String email, String password, int otp) {
        UserOTP userOTP = otpValidate(email, otp);
        ChangePasswordDTO dto = new ChangePasswordDTO(password,userOTP.getUser().getUserId());
        changePassword(dto);
        userOTPService.removeOTP(userOTP);
    }

}
