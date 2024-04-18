package com.project.appointmentscheduler.service;

import com.project.appointmentscheduler.dto.*;
import com.project.appointmentscheduler.entity.Appointment;
import com.project.appointmentscheduler.entity.AppointmentInstance;
import com.project.appointmentscheduler.entity.Occurrence;
import com.project.appointmentscheduler.entity.User;
import com.project.appointmentscheduler.error.exceptions.AppointmentNotExistException;
import com.project.appointmentscheduler.error.exceptions.ForbiddenAccessException;
import com.project.appointmentscheduler.error.exceptions.InvalidAppointmentException;
import com.project.appointmentscheduler.helper.CommonHelper;
import com.project.appointmentscheduler.repository.AppointmentInstanceRepository;
import com.project.appointmentscheduler.repository.AppointmentRepository;
import com.project.appointmentscheduler.repository.UserRepository;
import com.project.appointmentscheduler.service.interfaces.AppointmentService;
import com.project.appointmentscheduler.service.interfaces.EmailService;
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

    @Autowired
    private EmailService emailService;

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

        emailService.sendAppointmentRegistrationEmail(appointment,appointmentInstanceList.get(0).getStartDateTime(),appointmentInstanceList.get(instances-1).getEndDateTime());
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
    public Boolean updateAppointment(SaveAppointmentRequestDTO appointmentDTO) {
        Appointment appointment = appointmentRepository.findById(appointmentDTO.getAppointmentId()).orElseThrow(()->new AppointmentNotExistException("Appointment with given Id is not found"));

        List<AppointmentInstance> appointmentInstanceList= appointment.getAppointmentInstances();

        Optional<User> scheduledByUser = userRepository.findById(appointmentDTO.getScheduledBy());
        Optional<User> scheduledWithUser = userRepository.findById(appointmentDTO.getScheduledWith());

        if (scheduledByUser.isEmpty() || scheduledWithUser.isEmpty()) {
            throw new InvalidAppointmentException("Provide correct values for scheduled by and scheduled with field");
        }

        if((appointmentDTO.getScheduledWith() != appointment.getScheduledWith().getUserId()) ||
                (appointmentDTO.getScheduledBy() != appointment.getScheduledBy().getUserId()) ||
                (appointmentDTO.getOccurrence() != appointment.getOccurrence()) ||
                (appointmentDTO.getInstances() != appointmentInstanceList.size())
        ){
            throw new InvalidAppointmentException("Value Mismatch is schedule by, schedule with, or occurrence or instances field");
        }

        Occurrence occurrence = appointmentDTO.getOccurrence();
        int instances = appointmentDTO.getInstances();

        if ((occurrence == Occurrence.ONCE && instances > 1) || (occurrence != Occurrence.ONCE && instances == 1)) {
            throw new InvalidAppointmentException("Invalid appointment occurrence and instances input");
        }

        if (instances > 30) {
            throw new InvalidAppointmentException("Cannot create more than 30 appointment instances at one time");
        }

        List<LocalDateTime> startTimesList = new ArrayList<>();
        List<LocalDateTime> endTimesList = new ArrayList<>();
        List<Long> instanceIds = new ArrayList<>();

        List<AppointmentInstance> updatedInstanceList=new ArrayList<>();

        for(int i=0;i<appointmentInstanceList.size();i++){

            AppointmentInstance instance = appointmentInstanceList.get(i);
            LocalDateTime startDateTime = instance.getStartDateTime();
            LocalDateTime endDateTime = instance.getStartDateTime();

            if(startDateTime.isAfter(LocalDateTime.now())){
                LocalDateTime std= appointmentDTO.getStartDateTime();
                LocalDateTime etd= appointmentDTO.getEndDateTime();
                startDateTime = startDateTime.withHour(std.getHour()).withMinute(std.getMinute());
                endDateTime = endDateTime.withHour(etd.getHour()).withMinute(etd.getMinute());

                startTimesList.add(startDateTime);
                endTimesList.add(endDateTime);
                instanceIds.add(instance.getAppointmentInstanceId());

                instance.setStartDateTime(startDateTime);
                instance.setEndDateTime(endDateTime);
                updatedInstanceList.add(instance);
            }
        }

        String startTimesJSON = commonHelper.convertDatesToJsonArray(startTimesList);
        String endTimesJSON = commonHelper.convertDatesToJsonArray(endTimesList);
        String instancesIdsJSON = commonHelper.convertToJsonArray(instanceIds);

        if (startTimesJSON == null || endTimesJSON == null || instancesIdsJSON==null) {
            throw new RuntimeException("Error occurred during processing request, please try again later");
        }

        boolean areAppointmentsOverlapping = appointmentRepository.checkOverlappingAppointmentsUpdate(
                startTimesJSON,
                endTimesJSON,
                instancesIdsJSON,
                appointmentDTO.getScheduledBy(),
                appointmentDTO.getScheduledWith()
        );

        if (areAppointmentsOverlapping) throw new InvalidAppointmentException("Cannot create overlapping appointments");

        scheduledByUser.ifPresent(appointment::setScheduledBy);
        scheduledWithUser.ifPresent(appointment::setScheduledWith);

        appointment.setDescription(appointmentDTO.getDescription());
        appointment.setLocation(appointmentDTO.getLocation());
        appointment.setTitle(appointmentDTO.getTitle());
        appointment.setType(appointmentDTO.getType());

        appointmentRepository.save(appointment);

        instanceRepository.saveAll(updatedInstanceList);

        emailService.sendAppointmentUpdateEmail(appointment,updatedInstanceList.get(0).getStartDateTime(),updatedInstanceList.get(instances-1).getEndDateTime());

        return null;
    }

    @Override
    @Transactional
    public Boolean deleteAppointment(Long appointmentId, Long userId) {
        Appointment appointment= appointmentRepository.findById(appointmentId).orElseThrow(()->new AppointmentNotExistException("Appointment with given Id is not found"));
        if (!appointment.getScheduledBy().getUserId().equals(userId)){
            throw new ForbiddenAccessException("Your Are Not Allowed to delete Appointment");
        }

        appointmentRepository.deleteById(appointmentId);
        return true;
    }

    private GetAppointmentResponseDTO convertAppointmentToPrivateAppointment(Appointment appointment){
        GetAppointmentResponseDTO responseDTO = GetAppointmentResponseDTO.builder().appointmentId(appointment.getAppointmentId()).title("Scheduled With Another User").description("busy").appointmentInstances(appointment.getAppointmentInstances()).build();

        return responseDTO;
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
