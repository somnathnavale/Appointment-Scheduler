package com.project.appointmentscheduler.service;

import com.project.appointmentscheduler.repository.UserRepository;
import com.project.appointmentscheduler.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetailsService userDetailsService() {
         return (username) -> userRepository.findByEmail(username).orElseThrow(()->new UsernameNotFoundException("User With Given Email Id not present"));
    }
}
