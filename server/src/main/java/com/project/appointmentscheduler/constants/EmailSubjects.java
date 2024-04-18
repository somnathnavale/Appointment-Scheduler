package com.project.appointmentscheduler.constants;

public interface EmailSubjects {
    static final String USER_REGISTRATION = "Welcome to Calendify! Start Managing Your Appointments Today!";
    static final String APPOINTMENT_REGISTRATION = "New appointment scheduled with <<scheduledWith>>.";
    static final String APPOINTMENT_REGISTRATION_RECURRING = "New recurring appointment scheduled with <<scheduledWith>>.";
    static final String APPOINTMENT_UPDATE = "Updated appointment scheduled with <<scheduledWith>>.";
    static final String APPOINTMENT_INSTANCE_UPDATE = "Updated appointment instance scheduled with <<scheduledWith>>.";
}
