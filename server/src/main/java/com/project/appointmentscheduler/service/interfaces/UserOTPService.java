package com.project.appointmentscheduler.service.interfaces;

import com.project.appointmentscheduler.entity.UserOTP;

public interface UserOTPService {
    public UserOTP getUserOTP(Long userId);

    void saveOTP(UserOTP userOTP);

    void removeOTP(UserOTP userOTP);
}
