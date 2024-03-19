package com.project.appointmentscheduler.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AppointmentInstance {

    @Id
    @SequenceGenerator(
            name = "appointmentInstanceSequence",
            sequenceName =  "appointmentInstanceSequence",
            allocationSize = 1
    )
    @GeneratedValue(strategy =  GenerationType.SEQUENCE,generator =  "appointmentInstanceSequence")
    private Long appointmentInstanceId;

    @ManyToOne
    @JoinColumn(name = "appointment_id", referencedColumnName = "appointmentId",nullable = false)
    @JsonBackReference
    private Appointment appointment;

    @NotNull(message = "Appointment start time is required field")
    private LocalDateTime startDateTime;

    @NotNull(message = "Appointment end time is required field")
    private LocalDateTime endDateTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status=Status.SCHEDULED;
}
