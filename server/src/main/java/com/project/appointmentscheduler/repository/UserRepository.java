package com.project.appointmentscheduler.repository;

import com.project.appointmentscheduler.dto.UserDTO;
import com.project.appointmentscheduler.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
    Optional<UserDTO> findByUserId(Long id);

    @Query(value = "SELECT * FROM user u WHERE lower(concat(u.firstname, ' ', u.lastname)) LIKE lower(concat('%', :name, '%'))", nativeQuery = true)
    List<User> findByFullNameContainingIgnoreCase(@Param("name") String name);
}
