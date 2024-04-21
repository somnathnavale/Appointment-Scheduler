package com.project.appointmentscheduler.service;

import com.project.appointmentscheduler.repository.UserOTPRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ScheduleOTPRemoveImpl {

    @Autowired
    private UserOTPRepository userOTPRepository;

    @Transactional
    @Async("asyncTaskExecutor")
    @Scheduled(fixedRate = 3600000) // Run every hour (3600000 milliseconds)
    public void deleteExpiredOTP(){
        LocalDateTime currentDateTime = LocalDateTime.now();
        userOTPRepository.deleteByExpiryTimeBefore(currentDateTime);
    }
}
