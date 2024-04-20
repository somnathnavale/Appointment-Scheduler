package com.project.appointmentscheduler.service;

import com.project.appointmentscheduler.entity.UserOTP;
import com.project.appointmentscheduler.repository.UserOTPRepository;
import com.project.appointmentscheduler.service.interfaces.UserOTPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserOTPServiceImpl implements UserOTPService {

    @Autowired
    private UserOTPRepository userOTPRepository;

    public UserOTP getUserOTP(Long userId){
        UserOTP otp = userOTPRepository.findByUserId(userId);
        return otp;
    }

    @Override
    public void saveOTP(UserOTP userOTP) {
        userOTPRepository.save(userOTP);
    }

    @Override
    public void removeOTP(UserOTP userOTP) {
        userOTPRepository.deleteById(userOTP.getId());
    }
}
