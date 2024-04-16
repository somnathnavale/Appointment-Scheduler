package com.project.appointmentscheduler.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.appointmentscheduler.dto.*;
import com.project.appointmentscheduler.entity.Appointment;
import com.project.appointmentscheduler.entity.AppointmentInstance;
import com.project.appointmentscheduler.entity.Occurrence;
import com.project.appointmentscheduler.entity.User;
import com.project.appointmentscheduler.error.exceptions.AppointmentNotExistException;
import com.project.appointmentscheduler.error.exceptions.InvalidAppointmentException;
import com.project.appointmentscheduler.helper.CommonHelper;
import com.project.appointmentscheduler.repository.AppointmentInstanceRepository;
import com.project.appointmentscheduler.repository.AppointmentRepository;
import com.project.appointmentscheduler.repository.UserRepository;
import com.project.appointmentscheduler.service.interfaces.AppointmentService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AppointmentInstanceRepository instanceRepository;

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private CommonHelper commonHelper;

    @Override
    public List<GetAppointmentResponseDTO> getAllAppointments() {
        return null;
    }

    @Override
    @Transactional
    public GetAppointmentResponseDTO saveAppointment(SaveAppointmentRequestDTO saveAppointmentRequestDTO) {
        Appointment appointment = modelMapper.map(saveAppointmentRequestDTO, Appointment.class);

        Optional<User> scheduledByUser = userRepository.findById(saveAppointmentRequestDTO.getScheduledBy());
        Optional<User> scheduledWithUser = userRepository.findById(saveAppointmentRequestDTO.getScheduledWith());

        if (scheduledByUser.isEmpty() || scheduledWithUser.isEmpty()) {
            throw new InvalidAppointmentException("Provide correct values for scheduled by and scheduled with field");
        }

        Occurrence occurrence = saveAppointmentRequestDTO.getOccurrence();
        int instances = saveAppointmentRequestDTO.getInstances();

        LocalDateTime startDateTime = saveAppointmentRequestDTO.getStartDateTime();
        LocalDateTime endDateTime = saveAppointmentRequestDTO.getEndDateTime();

        if ((occurrence == Occurrence.ONCE && instances > 1) || (occurrence != Occurrence.ONCE && instances == 1)) {
            throw new InvalidAppointmentException("Invalid appointment occurrence and instances input");
        }

        if (instances > 30) {
            throw new InvalidAppointmentException("Cannot create more than 30 appointment instances at one time");
        }

        if (startDateTime.isAfter(endDateTime) || startDateTime.isBefore(LocalDateTime.now())) {
            throw new InvalidAppointmentException("Appointments only be created in Present or Future");
        }

        int daysGap = commonHelper.getIntOccurrenceByEnumKey(occurrence);

        boolean isOverlappingAppointmentExists = isAppointmentsOverlapping(startDateTime, endDateTime, instances, daysGap, saveAppointmentRequestDTO.getScheduledBy(), saveAppointmentRequestDTO.getScheduledWith());

        if (isOverlappingAppointmentExists) throw new InvalidAppointmentException("Cannot create overlapping appointments");

        scheduledByUser.ifPresent(appointment::setScheduledBy);
        scheduledWithUser.ifPresent(appointment::setScheduledWith);

        Appointment saved = appointmentRepository.save(appointment);

        List<AppointmentInstance> appointmentInstanceList = new ArrayList<>();

        for (int i = 0; i < instances; i++) {
            LocalDateTime sdt = startDateTime.plusDays(i * daysGap).withNano(0);
            LocalDateTime edt = endDateTime.plusDays(i * daysGap).withNano(0);

            AppointmentInstance appointmentInstance = new AppointmentInstance();

            appointmentInstance.setAppointment(appointment);
            appointmentInstance.setStartDateTime(sdt);
            appointmentInstance.setEndDateTime(edt);
            appointmentInstanceList.add(appointmentInstance);
        }

        instanceRepository.saveAll(appointmentInstanceList);

        GetAppointmentResponseDTO responseDTO = modelMapper.map(appointment,GetAppointmentResponseDTO.class);
        responseDTO.setAppointmentInstances(appointmentInstanceList);
        return responseDTO;
    }

    @Override
    public GetAllAppointmentResponseDTO getAllAppointmentsByUser(Long scheduledBy, Long scheduledWith) {
        List<Appointment> allAppointments = appointmentRepository.findAllByUserId(scheduledWith);

        //find common appointments
        List<GetAppointmentResponseDTO> commonAppointments = allAppointments.stream().filter(appointment -> (appointment.getScheduledBy().getUserId() == scheduledBy || appointment.getScheduledWith().getUserId() == scheduledBy)
        ).map(appointment -> modelMapper.map(appointment, GetAppointmentResponseDTO.class)).toList();

        List<GetAppointmentResponseDTO> otherPrivateAppointments=  allAppointments.stream().filter(appointment -> (appointment.getScheduledBy().getUserId() != scheduledBy && appointment.getScheduledWith().getUserId() != scheduledBy)
        ).map(appointment -> convertAppointmentToPrivateAppointment(appointment)).toList();

        GetAllAppointmentResponseDTO responseDTO= new GetAllAppointmentResponseDTO(commonAppointments,otherPrivateAppointments);
        return responseDTO;
    }

    @Override
    public List<MeetStatsProjection> getMeetStats() {
        return appointmentRepository.getAppointmentStats();
    }

    @Override
    @Transactional
    public Message updateAppointment(SaveAppointmentRequestDTO appointmentDTO) {
        Appointment appointment = appointmentRepository.findById(appointmentDTO.getAppointmentId()).orElseThrow(()->new AppointmentNotExistException("Appointment with given Id is not found"));

        return null;
    }

    private GetAppointmentResponseDTO convertAppointmentToPrivateAppointment(Appointment appointment){
        GetAppointmentResponseDTO responseDTO = GetAppointmentResponseDTO.builder().appointmentId(appointment.getAppointmentId()).title("Scheduled With Another User").description("busy").appointmentInstances(appointment.getAppointmentInstances()).build();

        return responseDTO;
    }

    private void validateAppointment(SaveAppointmentRequestDTO appointmentDTO, SaveAppointmentRequestDTO previousAppointmentDTO, UserAction action){
        Appointment appointment = modelMapper.map(appointmentDTO, Appointment.class);

        Optional<User> scheduledByUser = userRepository.findById(appointmentDTO.getScheduledBy());
        Optional<User> scheduledWithUser = userRepository.findById(appointmentDTO.getScheduledWith());

        if (scheduledByUser.isEmpty() || scheduledWithUser.isEmpty()) {
            throw new InvalidAppointmentException("Provide correct values for scheduled by and scheduled with field");
        }

        if((appointmentDTO.getScheduledWith() != previousAppointmentDTO.getScheduledWith()) ||
                (appointmentDTO.getScheduledBy() != previousAppointmentDTO.getScheduledBy()) ||
                (appointmentDTO.getOccurrence() != previousAppointmentDTO.getOccurrence()) ||
                (appointmentDTO.getInstances() != previousAppointmentDTO.getInstances())
        ){
            throw new InvalidAppointmentException("Value Mismatch is schedule by, schedule with, or occurrence or instnaces field");
        }

        Occurrence occurrence = appointmentDTO.getOccurrence();
        int instances = appointmentDTO.getInstances();

        LocalDateTime startDateTime = appointmentDTO.getStartDateTime();
        LocalDateTime endDateTime = appointmentDTO.getEndDateTime();

        if ((occurrence == Occurrence.ONCE && instances > 1) || (occurrence != Occurrence.ONCE && instances == 1)) {
            throw new InvalidAppointmentException("Invalid appointment occurrence and instances input");
        }

        if (instances > 30) {
            throw new InvalidAppointmentException("Cannot create more than 30 appointment instances at one time");
        }

        if (startDateTime.isAfter(endDateTime) || startDateTime.isBefore(LocalDateTime.now())) {
            throw new InvalidAppointmentException("Appointments only be created in Present or Future");
        }

        int daysGap = commonHelper.getIntOccurrenceByEnumKey(occurrence);

        boolean isOverlappingAppointmentExists = isAppointmentsOverlapping(startDateTime, endDateTime, instances, daysGap, appointmentDTO.getScheduledBy(), appointmentDTO.getScheduledWith());

        if (isOverlappingAppointmentExists) throw new InvalidAppointmentException("Cannot create overlapping appointments");

        scheduledByUser.ifPresent(appointment::setScheduledBy);
        scheduledWithUser.ifPresent(appointment::setScheduledWith);
    }

    private boolean isAppointmentsOverlapping(LocalDateTime startDateTime, LocalDateTime endDateTime, int instances, int daysGap, Long scheduledBy, Long scheduledWith) {

        List<LocalDateTime> startTimesList = new ArrayList<>();
        List<LocalDateTime> endTimesList = new ArrayList<>();

        for (int i = 0; i < instances; i++) {
            LocalDateTime sdt = startDateTime.plusDays(i * daysGap).withNano(0);
            LocalDateTime edt = endDateTime.plusDays(i * daysGap).withNano(0);
            startTimesList.add(sdt);
            endTimesList.add(edt);
        }

        String startTimesJSON = commonHelper.convertDatesToJsonArray(startTimesList);
        String endTimesJSON = commonHelper.convertDatesToJsonArray(endTimesList);
        if (startTimesJSON == null || endTimesJSON == null) {
            throw new RuntimeException("Error occurred during processing request, please try again later");
        }
        boolean areAppointmentsOverlapping = appointmentRepository.checkOverlappingAppointments(
                startTimesJSON,
                endTimesJSON,
                scheduledBy,
                scheduledWith
        );
        return areAppointmentsOverlapping;
    }
}
