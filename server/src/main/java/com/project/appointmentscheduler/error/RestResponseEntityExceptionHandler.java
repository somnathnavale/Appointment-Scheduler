package com.project.appointmentscheduler.error;

import com.project.appointmentscheduler.dto.Message;
import com.project.appointmentscheduler.error.exceptions.ForbiddenAccessException;
import com.project.appointmentscheduler.error.exceptions.InvalidAppointmentException;
import com.project.appointmentscheduler.error.exceptions.InvalidOTPException;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.security.SignatureException;
import java.util.stream.Collectors;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<Message> handleUsernameNotFound(UsernameNotFoundException exception){
        Message errorMessage=new Message(HttpStatus.BAD_REQUEST,exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
    }

    @Override
    public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {

        Message errorMessage=new Message(
                HttpStatus.BAD_REQUEST,
                ex.getBindingResult().getFieldErrors().stream()
                        .map(err -> err.getDefaultMessage())
                        .collect(Collectors.joining(", ")));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Message> handleBadCredential(BadCredentialsException e){
        Message errorMessage=new Message(HttpStatus.BAD_REQUEST,"Please Provide Valid Credentials");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Message> handleEntityNotFound(EntityNotFoundException exception){
        Message errorMessage=new Message(HttpStatus.BAD_REQUEST,exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
    }

    @ExceptionHandler(ForbiddenAccessException.class)
    public ResponseEntity<Message> handleForbiddenAccess(ForbiddenAccessException exception){
        Message errorMessage=new Message(HttpStatus.FORBIDDEN,exception.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorMessage);
    }

    @ExceptionHandler(InvalidAppointmentException.class)
    public ResponseEntity<Message> handleInvalidAppointment(InvalidAppointmentException exception){
        Message errorMessage=new Message(HttpStatus.BAD_REQUEST,exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
    }

    @ExceptionHandler(InvalidOTPException.class)
    public ResponseEntity<Message> handleInvalidOTP(InvalidOTPException exception){
        Message errorMessage=new Message(HttpStatus.BAD_REQUEST,exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<Message> handleJWT(ExpiredJwtException exception){
        Message errorMessage=new Message(HttpStatus.UNAUTHORIZED,exception.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorMessage);
    }

    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<Message> handleJWT(SignatureException exception){
        Message errorMessage=new Message(HttpStatus.UNAUTHORIZED,exception.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorMessage);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<Message> handleAuthenticationException(AuthenticationException exception) {
        Message errorMessage=new Message(HttpStatus.UNAUTHORIZED,exception.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorMessage);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Message> handleRuntime(RuntimeException exception){
        Message errorMessage=new Message(HttpStatus.BAD_REQUEST,exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
    }
}
