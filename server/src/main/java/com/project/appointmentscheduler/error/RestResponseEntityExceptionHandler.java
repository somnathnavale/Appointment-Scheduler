package com.project.appointmentscheduler.error;

import com.project.appointmentscheduler.dto.Message;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

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
}
