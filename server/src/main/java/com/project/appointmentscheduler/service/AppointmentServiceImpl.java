package com.project.appointmentscheduler.service;

import com.project.appointmentscheduler.dto.GetAppointmentResponseDTO;
import com.project.appointmentscheduler.dto.SaveAppointmentRequestDTO;
import com.project.appointmentscheduler.entity.Appointment;
import com.project.appointmentscheduler.entity.AppointmentInstance;
import com.project.appointmentscheduler.entity.Occurrence;
import com.project.appointmentscheduler.entity.User;
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
            throw new RuntimeException(("Provide Correct Values for Schedule By and Schedule With field"));
        }

        Occurrence occurrence = saveAppointmentRequestDTO.getOccurrence();
        int instances = saveAppointmentRequestDTO.getInstances();

        LocalDateTime startDateTime = saveAppointmentRequestDTO.getStartDateTime();
        LocalDateTime endDateTime = saveAppointmentRequestDTO.getEndDateTime();

        if ((occurrence == Occurrence.ONCE && instances > 1) || (occurrence != Occurrence.ONCE && instances == 1)) {
            throw new RuntimeException("Invalid appointment occurrence and instances input");
        }

        if (instances > 30) {
            throw new RuntimeException("Cannot create more than 30 appointment instances one time");
        }

        if (startDateTime.isAfter(endDateTime) || startDateTime.isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Appointment Only be created in Present Or Future");
        }

        int daysGap = commonHelper.getIntOccurrenceByEnumKey(occurrence);

        boolean isOverlappingAppointmentExists = isAppointmentsOverlapping(startDateTime, endDateTime, instances, daysGap, saveAppointmentRequestDTO.getScheduledBy(), saveAppointmentRequestDTO.getScheduledWith());

        if (isOverlappingAppointmentExists) throw new RuntimeException("Cannot create Overlapping meetings");

        scheduledByUser.ifPresent(appointment::setScheduledBy);
        scheduledWithUser.ifPresent(appointment::setScheduledWith);

        Appointment saved = appointmentRepository.save(appointment);
        System.out.println("appointment is" + appointment);
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


        return null;
    }

    @Override
    public List<GetAppointmentResponseDTO> getAllAppointmentsByUser(Long scheduledBy, Long scheduledWith) {
        List<Appointment> allAppointments = appointmentRepository.findAllByUserId(scheduledWith);

        //find common appointments
        List<GetAppointmentResponseDTO> commonAppointments = allAppointments.stream().filter(appointment -> (appointment.getScheduledBy().getUserId() == scheduledBy || appointment.getScheduledWith().getUserId() == scheduledBy)
        ).map(appointment -> modelMapper.map(appointment, GetAppointmentResponseDTO.class)).toList();

        return commonAppointments;
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
            throw new RuntimeException("Error Occurred During Processing");
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
