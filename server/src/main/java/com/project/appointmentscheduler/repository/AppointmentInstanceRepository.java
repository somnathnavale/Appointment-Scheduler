package com.project.appointmentscheduler.repository;

import com.project.appointmentscheduler.entity.Appointment;
import com.project.appointmentscheduler.entity.AppointmentInstance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentInstanceRepository extends JpaRepository<AppointmentInstance,Long> {
    @Query(value = "Select * from appointment_instance a where a.appointment_id=:appointmentId", nativeQuery = true)
    public List<AppointmentInstance> findByAppointmentId(Long appointmentId);

    @Procedure(procedureName = "check_overlapping_instance_update")
    public Boolean checkOverlappingInstances(
            @Param("start_date_val") String startDateTime,
            @Param("end_date_val") String endEndTime,
            @Param("p_scheduled_by") Long scheduledBy,
            @Param("p_scheduled_with") Long scheduledWith,
            @Param("p_instance_id") Long instanceId
    );

    @Query(value = "SELECT * FROM appointment_instance where DATE(start_date_time) = date(NOW()) AND status<>'CANCELLED'",nativeQuery = true)
    List<AppointmentInstance> findAppointmentsForCurrentDate();
}
