package com.project.appointmentscheduler.repository;

import com.project.appointmentscheduler.dto.MeetStatsProjection;
import com.project.appointmentscheduler.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Long> {

    @Procedure(procedureName = "check_overlapping_appointments")
    public Boolean checkOverlappingAppointments(
            @Param("array_of_start_times") String arrayOfStartTimes,
            @Param("array_of_end_times") String arrayOfEndTimes,
            @Param("p_scheduled_by") Long scheduledBy,
            @Param("p_scheduled_with") Long scheduledWith
    );

    @Procedure(procedureName = "check_overlapping_appointments_update")
    public boolean checkOverlappingAppointmentsUpdate(
            @Param("array_of_start_times") String arrayOfStartTimes,
            @Param("array_of_end_times") String arrayOfEndTimes,
            @Param("array_of_instance_ids") String arrayOfInstanceIds,
            @Param("p_scheduled_by") Long scheduledBy,
            @Param("p_scheduled_with") Long scheduledWith
    );

    @Query(
            value = "Select * FROM appointment WHERE scheduled_by=:userId OR scheduled_with=:userId",
            nativeQuery = true
    )
    public List<Appointment> findAllByUserId(Long userId);

    @Query(value= "SELECT type, count(type) as count FROM appointment group by type", nativeQuery = true)
    public List<MeetStatsProjection> getAppointmentStats();
}
