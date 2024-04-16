package com.project.appointmentscheduler.dto;

import com.project.appointmentscheduler.entity.AppointmentType;
import com.project.appointmentscheduler.entity.Occurrence;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SaveAppointmentRequestDTO {

    private long appointmentId=-1;

    @NotBlank(message = "Appointment title is required field")
    private String title;

    @NotBlank(message = "Appointment description is required field")
    private String description;

    @NotNull(message = "Appointment start time is required field")
    private LocalDateTime startDateTime;

    @NotNull(message = "Appointment end time is required field")
    private LocalDateTime endDateTime;

    @NotNull(message = "Appointment Scheduled By is required field")
    private Long scheduledBy;

    @NotNull(message = "Appointment Scheduled With is required field")
    private Long scheduledWith;

    @NotNull(message = "Appointment type is required field")
    private AppointmentType type;

    @NotNull(message = "Appointment Instances is required field")
    @Min(value = 1, message = "Number of instances must be at least 1")
    @Max(value = 30, message = "Number of instances must be at less than 30")
    private int instances;

    @NotNull(message = "occurrence is required field")
    private Occurrence occurrence;

    private String location;
}
