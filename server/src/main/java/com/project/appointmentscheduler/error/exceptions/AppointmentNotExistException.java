package com.project.appointmentscheduler.error.exceptions;

public class AppointmentNotExistException extends RuntimeException{
    public AppointmentNotExistException() {
    }

    public AppointmentNotExistException(String message) {
        super(message);
    }

    public AppointmentNotExistException(String message, Throwable cause) {
        super(message, cause);
    }

    public AppointmentNotExistException(Throwable cause) {
        super(cause);
    }

    public AppointmentNotExistException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
