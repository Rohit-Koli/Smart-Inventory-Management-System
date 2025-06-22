package com.backend.controllers;

import com.backend.entities.AdminEntity;
import com.backend.entities.Product;
import com.backend.entities.UserEntity;
import com.backend.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
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

    @GetMapping("/getTotalProductsCount")
    public Long getTotalProductsCount(){
        return service.getTotalProducts();
    }

    @GetMapping("/getLowStockItemCounts")
    public Long getLowStockItemCounts(){
        return service.getLowStockItemCounts();
    }

    @GetMapping("/getTodaySalesTotal")
    public double getTodaySalesTotal(){
        return service.getTodaySalesTotal();
    }

    @GetMapping("/getMonthlySalesTotal")
    public double getMonthlySalesTotal(){
        return service.getMonthlySalesTotal();
    }

    @GetMapping("/getAllUsers")
    public List<UserEntity> getAllUsers(){
        return service.getAllUsers();
    }

    @GetMapping("/getAllProducts")
    public List<Product> getAllProducts(){
        return service.getAllProducts();
    }

    @GetMapping("/getAllAdmins")
    public List<AdminEntity> getAllAdmins(){
        return service.getAllAdmins();
    }
//    http://localhost:8081/admin/adminLogin?email=admin.rohit@mail.com&password=123
    @GetMapping("/adminLogin")
    public ResponseEntity<AdminEntity> adminLogin(@RequestParam String email,String password){
        return service.adminLogin(email, password);
    }

}
