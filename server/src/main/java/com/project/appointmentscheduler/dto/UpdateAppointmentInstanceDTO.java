package com.project.appointmentscheduler.dto;

import com.project.appointmentscheduler.entity.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateAppointmentInstanceDTO {
    private Long appointmentInstanceId;

    @NotNull(message = "Appointment start time is required field")
    private LocalDateTime startDateTime;

    @NotNull(message = "Appointment end time is required field")
    private LocalDateTime endDateTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status=Status.SCHEDULED;
}
