package com.project.appointmentscheduler.service.interfaces;

import com.project.appointmentscheduler.entity.AppointmentInstance;

import java.util.List;

public interface AppointmentInstanceService {

    public AppointmentInstance getAppointmentInstanceById(Long appointmentId, Long instanceId);

    List<AppointmentInstance> getAllAppointmentInstanceByAppointmentId(Long appointmentId);

    AppointmentInstance updateAppointmentInstanceById(Long appointmentId, Long instanceId);

    Boolean deleteAppointmentInstanceById(Long appointmentId, Long instanceId);
}
