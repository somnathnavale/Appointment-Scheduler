package com.project.appointmentscheduler.repository;

import com.project.appointmentscheduler.entity.Appointment;
import com.project.appointmentscheduler.entity.AppointmentInstance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentInstanceRepository extends JpaRepository<AppointmentInstance,Long> {
    @Query(value = "Select * from appointment_instance a where a.appointment_id=:appointmentId", nativeQuery = true)
    public List<AppointmentInstance> findByAppointmentId(Long appointmentId);
}
