package com.project.appointmentscheduler.service;

import com.project.appointmentscheduler.entity.AppointmentInstance;
import com.project.appointmentscheduler.repository.AppointmentInstanceRepository;
import com.project.appointmentscheduler.service.interfaces.AppointmentInstanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentInstanceServiceImpl implements AppointmentInstanceService {

    @Autowired
    private AppointmentInstanceRepository instanceRepository;
    @Override
    public AppointmentInstance getAppointmentInstanceById(Long appointmentId,Long instanceId) {
        return instanceRepository.findById(instanceId).orElseThrow(()-> new RuntimeException("No appointment instance found"));
    }

    @Override
    public List<AppointmentInstance> getAllAppointmentInstanceByAppointmentId(Long appointmentId) {
        return instanceRepository.findByAppointmentId(appointmentId);
    }

    @Override
    public AppointmentInstance updateAppointmentInstanceById(Long appointmentId, Long instanceId) {
        return null;
    }

    @Override
    public Boolean deleteAppointmentInstanceById(Long appointmentId, Long instanceId) {
        return false;
    }
}
