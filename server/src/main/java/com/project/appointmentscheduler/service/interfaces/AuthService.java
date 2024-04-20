package com.project.appointmentscheduler.service.interfaces;

import com.project.appointmentscheduler.dto.*;
import com.project.appointmentscheduler.entity.User;
import com.project.appointmentscheduler.entity.UserOTP;

public interface AuthService {
    User registerUser(User user);

    LoginResponse authenticateUser(LoginRequest loginBody);

    void changePassword(ChangePasswordDTO passwordDTO);

    void emailValidateAndGenerateOTP(String email);

    UserOTP otpValidate(String email, int otp);

    void resetPassword(String email, String password, int otp);
}
