package com.backend.controllers;

import com.backend.entities.AdminEntity;
import com.backend.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController("/admin")
public class AdminController {

    @Autowired
    private AdminService service;

    @PostMapping("/addAdmin")
    public String addAdmin(@RequestBody AdminEntity admin){
        service.saveAdmin(admin);
        return "Admin Created";
    }

    @GetMapping("/getAdmin")
    public ResponseEntity<AdminEntity> getAdmin(@RequestParam Long id){
        AdminEntity admin= service.getAdmin(id);
        if (admin == null){
            System.out.println("No Such Admin Found ");
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(admin);
    }

    @PutMapping("/updateAdmin")
    public AdminEntity updateAdmin(@RequestBody AdminEntity admin){
        return service.updateAdmin(admin);
    }

    @DeleteMapping("/deleteAdmin")
    public boolean deleteAdmin(long id){
        return service.deleteAdmin(id);
    }


}
