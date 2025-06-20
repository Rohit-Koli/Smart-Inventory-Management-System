package com.backend.services;

import com.backend.entities.AdminEntity;
import com.backend.entities.Product;
import com.backend.entities.UserEntity;
import com.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService{

    @Autowired
    private AdminRepository repo;

    @Override
    public void saveAdmin(AdminEntity admin) {
        repo.save(admin);
    }

    @Override
    public AdminEntity loginAdmin(String email, String password) {
        return repo.findByEmailAndPassword(email,password).
                orElse(null);
    }

    @Override
    public AdminEntity getAdmin(Long id) {
        return repo.findById(id)
                .orElse(null);
    }

    @Override
    public boolean deleteAdmin(Long id) {
        if (repo.existsById(id)){
            repo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public AdminEntity updateAdmin(AdminEntity admin) {
        Optional<AdminEntity> existAdmin=repo.findById(admin.getAdminId());
        if (existAdmin.isPresent()){
            AdminEntity updateAdmin=existAdmin.get();
            updateAdmin.setName(admin.getName());
            updateAdmin.setEmail(admin.getEmail());
            updateAdmin.setPassword(admin.getPassword());
            return repo.save(updateAdmin);
        }
        return null;
    }

    @Override
    public boolean changeAdminPassword(Long id, String oldPassword, String newPassword) {
        Optional<AdminEntity> adminEntity=repo.findById(id);
        if (adminEntity.isPresent()){
            AdminEntity adminUpdate=adminEntity.get();
            if (!adminUpdate.getPassword().equals(oldPassword)){
                return false;
            }
            adminUpdate.setPassword(oldPassword);
            repo.save(adminUpdate);
            return true;
        }
        return false;
    }

    @Override
    public long getTotalProducts() {
        return 0;
    }

    @Override
    public long getLowStockItemCounts() {
        return 0;
    }

    @Override
    public double getTodaySalesTotal() {
        return 0;
    }

    @Override
    public double getMonthlySalesTotal() {
        return 0;
    }

    @Override
    public List<UserEntity> getAllUsers() {
        return List.of();
    }

    @Override
    public List<Product> getAllProducts() {
        return List.of();
    }

    @Override
    public List<AdminEntity> getAllAdmins() {
        return List.of();
    }
}
