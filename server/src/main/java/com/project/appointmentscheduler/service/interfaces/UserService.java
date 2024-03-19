package com.project.appointmentscheduler.service.interfaces;

import com.project.appointmentscheduler.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {
    UserDetailsService userDetailsService();

    void updateUser(UserDTO user);
}
