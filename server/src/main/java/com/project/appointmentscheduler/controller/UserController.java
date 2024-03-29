package com.project.appointmentscheduler.controller;

import com.project.appointmentscheduler.dto.Message;
import com.project.appointmentscheduler.dto.UserDTO;
import com.project.appointmentscheduler.entity.User;
import com.project.appointmentscheduler.error.exceptions.ForbiddenAccessException;
import com.project.appointmentscheduler.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PutMapping("/{id}")
    public ResponseEntity<Message> updateUser(@PathVariable("id") Long userId, @RequestBody UserDTO user, @AuthenticationPrincipal User loggedInUser){
        if(userId!=user.getUserId() || userId!= loggedInUser.getUserId())
            throw new ForbiddenAccessException("Access Denied to update user");
        userService.updateUser(user);
        Message message=new Message(HttpStatus.OK,"User Updated Successfully");
        return ResponseEntity.ok(message);
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDTO>> getAllUsers(@RequestParam String name){
        List<UserDTO> users = userService.getAllUsers(name);
        return ResponseEntity.ok(users);
    }

}
