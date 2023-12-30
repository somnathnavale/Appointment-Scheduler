package com.project.appointmentscheduler.service.interfaces;

import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    boolean isTokenValid(String token, UserDetails userDetails);
    String extractUsername(String token);
    String generateToken(UserDetails userDetails);
}
