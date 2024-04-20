package com.project.appointmentscheduler.repository;

import com.project.appointmentscheduler.entity.UserOTP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface UserOTPRepository extends JpaRepository<UserOTP, Long> {
    @Query("SELECT o FROM UserOTP o WHERE o.user.userId = ?1")
    public UserOTP findByUserId(Long userId);

    void deleteByExpiryTimeBefore(LocalDateTime currentDateTime);

}
