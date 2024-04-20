package com.project.appointmentscheduler.error.exceptions;


public class InvalidOTPException extends RuntimeException{
    public InvalidOTPException() {
    }

    public InvalidOTPException(String message) {
        super(message);
    }

    public InvalidOTPException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidOTPException(Throwable cause) {
        super(cause);
    }

    public InvalidOTPException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
