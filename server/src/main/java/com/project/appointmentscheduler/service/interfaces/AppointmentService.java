package com.project.appointmentscheduler.service.interfaces;

import com.project.appointmentscheduler.dto.*;

import java.util.List;

public interface AppointmentService {
    List<GetAppointmentResponseDTO> getAllAppointments();

    GetAppointmentResponseDTO saveAppointment(SaveAppointmentRequestDTO saveAppointmentRequestDTO);

    GetAllAppointmentResponseDTO getAllAppointmentsByUser(Long scheduledBy, Long scheduledWith);

    List<MeetStatsProjection> getMeetStats();
    Boolean updateAppointment(SaveAppointmentRequestDTO appointmentDTO);

    Boolean deleteAppointment(Long appointmentId, Long userId);
}
