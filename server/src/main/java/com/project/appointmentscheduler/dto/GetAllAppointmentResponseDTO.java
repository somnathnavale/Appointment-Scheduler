package com.project.appointmentscheduler.dto;

import com.project.appointmentscheduler.entity.Appointment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GetAllAppointmentResponseDTO {
    List<Appointment> commonAppointments;
    List<Appointment> otherAppointments;
}
