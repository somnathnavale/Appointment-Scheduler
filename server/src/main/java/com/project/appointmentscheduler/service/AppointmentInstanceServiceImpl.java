package com.project.appointmentscheduler.service;

import com.project.appointmentscheduler.dto.UpdateAppointmentInstanceDTO;
import com.project.appointmentscheduler.entity.Appointment;
import com.project.appointmentscheduler.entity.AppointmentInstance;
import com.project.appointmentscheduler.error.exceptions.AppointmentNotExistException;
import com.project.appointmentscheduler.error.exceptions.ForbiddenAccessException;
import com.project.appointmentscheduler.error.exceptions.InvalidAppointmentException;
import com.project.appointmentscheduler.repository.AppointmentInstanceRepository;
import com.project.appointmentscheduler.repository.AppointmentRepository;
import com.project.appointmentscheduler.service.interfaces.AppointmentInstanceService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class AppointmentInstanceServiceImpl implements AppointmentInstanceService {

    @Autowired
    private AppointmentInstanceRepository instanceRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public AppointmentInstance getAppointmentInstanceById(Long appointmentId,Long instanceId) {
        return instanceRepository.findById(instanceId).orElseThrow(()-> new RuntimeException("No appointment instance found"));
    }

    @Override
    public List<AppointmentInstance> getAllAppointmentInstanceByAppointmentId(Long appointmentId) {
        return instanceRepository.findByAppointmentId(appointmentId);
    }

    @Override
    public Boolean updateAppointmentInstanceById(Long appointmentId, Long instanceId, UpdateAppointmentInstanceDTO appointmentInstanceDTO, Long loggedInUserId) {

        Appointment appointment= appointmentRepository.findById(appointmentId).orElseThrow(()->new AppointmentNotExistException("Appointment with given Id is not found"));

        if (!appointment.getScheduledBy().getUserId().equals(loggedInUserId)){
            throw new ForbiddenAccessException("Your Are Not Allowed to update Appointment Instance");
        }

        AppointmentInstance instance = instanceRepository.findById(instanceId).orElseThrow(()-> new AppointmentNotExistException("Appointment Instance with given Id is not found"));

        if(!instance.getAppointment().getAppointmentId().equals(appointment.getAppointmentId())){
            throw new AppointmentNotExistException("Appointment with given Id is not found");
        }

        LocalDateTime startDateTime = appointmentInstanceDTO.getStartDateTime();
        LocalDateTime endDateTime = appointmentInstanceDTO.getEndDateTime();

        if (startDateTime.isAfter(endDateTime) || startDateTime.isBefore(LocalDateTime.now())) {
            throw new InvalidAppointmentException("Appointment Instance can be updated in present or future");
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String startTime = startDateTime.format(formatter);
        String endTime = endDateTime.format(formatter);

        boolean isOverlapping = instanceRepository.checkOverlappingInstances(
                startTime,
                endTime,
                appointment.getScheduledBy().getUserId(),
                appointment.getScheduledWith().getUserId(),
                instanceId
        );
        if(isOverlapping) throw new InvalidAppointmentException("Cannot create overlapping appointment instances");

        instance.setStartDateTime(startDateTime);
        instance.setEndDateTime(endDateTime);
        instance.setStatus(appointmentInstanceDTO.getStatus());
        instanceRepository.save(instance);

        return true;
    }

    @Override
    @Transactional
    public Boolean deleteAppointmentInstanceById(Long appointmentId, Long instanceId, Long loggedInUserId) {
        Appointment appointment= appointmentRepository.findById(appointmentId).orElseThrow(()->new AppointmentNotExistException("Appointment with given Id is not found"));

        int instances = appointment.getAppointmentInstances().size();

        if (!appointment.getScheduledBy().getUserId().equals(loggedInUserId)){
            throw new ForbiddenAccessException("Your Are Not Allowed to delete Appointment Instance");
        }

        AppointmentInstance instance = instanceRepository.findById(instanceId).orElseThrow(()-> new AppointmentNotExistException("Appointment Instance with given Id is not found"));

        if(!instance.getAppointment().getAppointmentId().equals(appointmentId)){
            throw new AppointmentNotExistException("Appointment with given Id is not found");
        }

        instanceRepository.deleteById(instanceId);

        if(instances==1){
            appointmentRepository.deleteById(appointmentId);
        }
        return true;
    }

}
