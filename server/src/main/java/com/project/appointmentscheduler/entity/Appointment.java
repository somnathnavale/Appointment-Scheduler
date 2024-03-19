package com.project.appointmentscheduler.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "appointment")
public class Appointment {

    @Id
    @SequenceGenerator(
            name = "appointment_sequence",
            sequenceName = "appointment_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "appointment_sequence"
    )
    private Long appointmentId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name = "scheduled_by",referencedColumnName = "userId",nullable = false)
    private User scheduledBy;

    @ManyToOne()
    @JoinColumn(name="scheduled_with",referencedColumnName = "userId",nullable = false)
    private User scheduledWith;

    @OneToMany(mappedBy = "appointment")
    @JsonManagedReference
    private List<AppointmentInstance> appointmentInstances;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AppointmentType type;

    private String location;
}
