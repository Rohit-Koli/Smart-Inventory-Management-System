package com.backend.controllers;

import com.backend.entities.UserEntity;
import com.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signupUser")
    public String signUp(@RequestBody UserEntity user){
        userService.saveUser(user);
        return "SignUp";
    }

    @GetMapping("/getUser")
    public ResponseEntity<UserEntity> getUserWithId(@RequestParam Long id){
        UserEntity user=userService.getUserById(id);
        if (user==null ){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/getUserWithEmail")
    public ResponseEntity<UserEntity> getUserWithEmail(@RequestParam String email){
        UserEntity user=userService.findByEmail(email);
        if (user!=null){
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
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

    @GetMapping("/userLogin")
   public ResponseEntity<UserEntity> userLogin(@RequestParam String email,String password){
        return userService.userLogin(email,password);
    }

}
