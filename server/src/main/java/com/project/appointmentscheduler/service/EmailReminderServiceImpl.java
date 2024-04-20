package com.project.appointmentscheduler.service;

import com.project.appointmentscheduler.entity.Appointment;
import com.project.appointmentscheduler.entity.AppointmentInstance;
import com.project.appointmentscheduler.repository.AppointmentInstanceRepository;
import com.project.appointmentscheduler.service.interfaces.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EmailReminderServiceImpl {

    @Autowired
    private AppointmentInstanceRepository instanceRepository;

    @Autowired
    private EmailService emailService;

    @Scheduled(cron = "0 0 9 * * *")
    public void sendDailyAppointmentReminders(){
        List<AppointmentInstance> instances = instanceRepository.findAppointmentsForCurrentDate();

        for(AppointmentInstance instance: instances){
            Appointment appointment = instance.getAppointment();
            emailService.sendAppointmentReminder(appointment, instance.getStartDateTime(), instance.getEndDateTime());
        }
    }
}
