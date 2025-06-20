package com.backend.services;

import com.backend.entities.AdminEntity;
import com.backend.entities.Product;
import com.backend.entities.UserEntity;

import java.util.List;

public interface AdminService {
    void saveAdmin(AdminEntity admin);
    AdminEntity loginAdmin(String email,String password);
    AdminEntity getAdmin(Long id);
    boolean deleteAdmin(Long id);
    AdminEntity updateAdmin(AdminEntity admin);
    boolean changeAdminPassword(Long id,String oldPassword,String newPassword);

    //Products
    long getTotalProducts();
    long getLowStockItemCounts();
    double getTodaySalesTotal();
    double getMonthlySalesTotal();

    List<UserEntity> getAllUsers();
    List<Product> getAllProducts();
    List<AdminEntity> getAllAdmins();
}
