package com.project.appointmentscheduler.service.interfaces;

import com.project.appointmentscheduler.dto.GetAllAppointmentResponseDTO;
import com.project.appointmentscheduler.dto.GetAppointmentResponseDTO;
import com.project.appointmentscheduler.dto.MeetStatsProjection;
import com.project.appointmentscheduler.dto.SaveAppointmentRequestDTO;

import java.util.List;

public interface AppointmentService {
    List<GetAppointmentResponseDTO> getAllAppointments();

    GetAppointmentResponseDTO saveAppointment(SaveAppointmentRequestDTO saveAppointmentRequestDTO);

    GetAllAppointmentResponseDTO getAllAppointmentsByUser(Long scheduledBy, Long scheduledWith);

    List<MeetStatsProjection> getMeetStats();
}
