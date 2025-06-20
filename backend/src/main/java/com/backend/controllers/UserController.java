package com.backend.controllers;

import com.backend.entities.UserEntity;
import com.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signupUser")
    public String signUp(@RequestBody UserEntity user){
        userService.saveUser(user);
        return "SignUp";
    }

    @GetMapping("/getUser")
    public UserEntity getUserWithId(@RequestParam Long id){
        return userService.getUserById(id);
    }

    @DeleteMapping("/deleteUser")
    public boolean deleteUserBy(@RequestParam Long id){
        return userService.deleteUser(id);
    }

    @PutMapping("/updateUser")
    public String updateUser(@RequestBody UserEntity user){
        UserEntity updatedUser=userService.updateUser(user);
        if (updatedUser!=null){
            return "User Updated";
        }
        return "User Not Updated !";
    }

    @GetMapping("/getAllUsers")
    public List<UserEntity> printAllUsers(){
        return userService.getAllUsers();
    }

}
