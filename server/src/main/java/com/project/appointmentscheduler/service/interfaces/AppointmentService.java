package com.project.appointmentscheduler.service.interfaces;

import com.project.appointmentscheduler.dto.GetAppointmentResponseDTO;
import com.project.appointmentscheduler.dto.SaveAppointmentRequestDTO;
import com.project.appointmentscheduler.entity.Appointment;

import java.util.List;

public interface AppointmentService {
    List<GetAppointmentResponseDTO> getAllAppointments();

    GetAppointmentResponseDTO saveAppointment(SaveAppointmentRequestDTO saveAppointmentRequestDTO);

    List<GetAppointmentResponseDTO> getAllAppointmentsByUser(Long scheduledBy,Long scheduledWith);
}
