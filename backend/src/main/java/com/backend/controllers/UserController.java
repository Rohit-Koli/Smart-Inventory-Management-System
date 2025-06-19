package com.backend.controllers;

import com.backend.entities.UserEntity;
import com.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public String signUp(@RequestBody UserEntity user){
        userService.saveUser(user);
        return "SignUp";
    }

    @GetMapping("/getuser")
    public UserEntity getUserWithId(@RequestParam Long id){
        return userService.getUserById(id);
    }

    @DeleteMapping("deleteUser")
    public boolean deleteUserBy(@RequestParam Long id){
        return userService.deleteUser(id);
    }

    



}
