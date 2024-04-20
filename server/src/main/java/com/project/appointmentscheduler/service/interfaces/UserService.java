package com.project.appointmentscheduler.service.interfaces;

import com.project.appointmentscheduler.dto.UserDTO;
import com.project.appointmentscheduler.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {
    UserDetailsService userDetailsService();

    void updateUser(UserDTO user);

    List<UserDTO> getAllUsers(String name);

    User findUserByEmail(String email);
}
