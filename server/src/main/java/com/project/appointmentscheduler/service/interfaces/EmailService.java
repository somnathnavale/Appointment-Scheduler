package com.project.appointmentscheduler.service.interfaces;


import com.project.appointmentscheduler.dto.EmailDetails;
import com.project.appointmentscheduler.entity.Appointment;
import com.project.appointmentscheduler.entity.AppointmentInstance;

import java.time.LocalDateTime;

public interface EmailService {

    public void sendEmail(EmailDetails emailDetails);
    public void sendUserRegistrationEmail(String to, String fullName);
    public void sendAppointmentRegistrationEmail(Appointment appointment, LocalDateTime startDateTime , LocalDateTime endDateTime);
    public void sendAppointmentUpdateEmail(Appointment appointment, LocalDateTime startDateTime ,LocalDateTime endDateTime);
    public void sendAppointmentInstanceUpdateEmail(Appointment appointment, LocalDateTime startDateTime ,LocalDateTime endDateTime, AppointmentInstance appointmentInstance);
    public void sendAppointmentReminder(Appointment appointment,LocalDateTime startDateTime, LocalDateTime endDateTime);
    public void sendEmailsForOTP(String name, String email, int otp);
}
