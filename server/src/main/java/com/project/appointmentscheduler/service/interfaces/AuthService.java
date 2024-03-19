package com.project.appointmentscheduler.service.interfaces;

import com.project.appointmentscheduler.dto.ChangePasswordDTO;
import com.project.appointmentscheduler.dto.LoginRequest;
import com.project.appointmentscheduler.dto.LoginResponse;
import com.project.appointmentscheduler.dto.UserDTO;
import com.project.appointmentscheduler.entity.User;

public interface AuthService {
    User registerUser(User user);

    LoginResponse authenticateUser(LoginRequest loginBody);

    void changePassword(ChangePasswordDTO passwordDTO);
}
