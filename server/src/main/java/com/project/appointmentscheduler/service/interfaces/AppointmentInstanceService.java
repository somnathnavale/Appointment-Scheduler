package com.project.appointmentscheduler.service.interfaces;

import com.project.appointmentscheduler.dto.Message;
import com.project.appointmentscheduler.dto.UpdateAppointmentInstanceDTO;
import com.project.appointmentscheduler.entity.AppointmentInstance;

import java.util.List;

public interface AppointmentInstanceService {

    public AppointmentInstance getAppointmentInstanceById(Long appointmentId, Long instanceId);

    List<AppointmentInstance> getAllAppointmentInstanceByAppointmentId(Long appointmentId);

    Boolean updateAppointmentInstanceById(Long appointmentId, Long instanceId, UpdateAppointmentInstanceDTO appointmentInstanceDTO, Long loggedInUserId);

    Boolean deleteAppointmentInstanceById(Long appointmentId, Long instanceId);
}
