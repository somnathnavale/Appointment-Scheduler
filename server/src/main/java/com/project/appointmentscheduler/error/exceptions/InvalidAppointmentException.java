package com.project.appointmentscheduler.error.exceptions;

public class InvalidAppointmentException extends RuntimeException{
    public InvalidAppointmentException() {
    }

    public InvalidAppointmentException(String message) {
        super(message);
    }

    public InvalidAppointmentException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidAppointmentException(Throwable cause) {
        super(cause);
    }

    public InvalidAppointmentException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
