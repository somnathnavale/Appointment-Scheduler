package com.project.appointmentscheduler.service;

import com.project.appointmentscheduler.dto.GetAppointmentResponseDTO;
import com.project.appointmentscheduler.dto.UserDTO;
import com.project.appointmentscheduler.entity.User;
import com.project.appointmentscheduler.repository.UserRepository;
import com.project.appointmentscheduler.service.interfaces.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UserDetailsService userDetailsService() {
         return (username) -> userRepository.findByEmail(username).orElseThrow(()->new UsernameNotFoundException("User With Given Email Id not present"));
    }

    @Override
    public void updateUser(UserDTO user) {
        User existingUser = userRepository.findById(user.getUserId()).orElseThrow(() -> new EntityNotFoundException("User not found with id: " + user.getUserId()));

        existingUser.setFirstname(user.getFirstname());
        existingUser.setLastname(user.getLastname());

        userRepository.save(existingUser);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<UserDTO> users = userRepository.findAll().stream().map(user -> modelMapper.map(user, UserDTO.class)).toList();
        return users;
    }
}
