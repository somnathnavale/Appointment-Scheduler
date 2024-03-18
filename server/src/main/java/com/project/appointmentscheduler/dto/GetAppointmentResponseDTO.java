package com.project.appointmentscheduler.dto;

import com.project.appointmentscheduler.entity.AppointmentInstance;
import com.project.appointmentscheduler.entity.AppointmentType;
import com.project.appointmentscheduler.entity.Status;
import com.project.appointmentscheduler.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetAppointmentResponseDTO {
        private Long appointmentId;
        private String title;
        private String description;
        private UserDTO scheduledBy;
        private UserDTO scheduledWith;
        private List<AppointmentInstance> appointmentInstances;
        private AppointmentType type;
        private String location;
        private Status status;
}
