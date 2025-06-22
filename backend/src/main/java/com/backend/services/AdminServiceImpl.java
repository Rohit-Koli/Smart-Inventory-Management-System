package com.backend.services;

import com.backend.entities.AdminEntity;
import com.backend.entities.Product;
import com.backend.entities.UserEntity;
import com.backend.repository.AdminRepository;
import com.backend.repository.ProductRepository;
import com.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService{

    @Autowired
    private AdminRepository repo;
    @Autowired
    private ProductRepository productRepo;
    @Autowired
    private UserRepository userRepo;

    @Override
    public void saveAdmin(AdminEntity admin) {
        repo.save(admin);
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
    public ResponseEntity<AdminEntity> adminLogin(String email, String password) {
        if (email == null || password == null) {
            return ResponseEntity.badRequest().build(); // 400 Bad Request
        }

        AdminEntity admin = repo.findByEmailAndPassword(email,password);

        if (admin == null || !admin.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401 Unauthorized
        }

        return ResponseEntity.ok(admin);
    }

    @Override
    public long getTotalProducts() {
        return productRepo.count();
    }

    @Override
    public long getLowStockItemCounts() {
        return productRepo.findAll().stream()
                .filter(p->p.getQuantity()<=10)
                .count();
    }

    @Override
    public double getTodaySalesTotal() {
        LocalDate today=LocalDate.now();
        return productRepo.findAll().stream()
                .filter(p->p.getCreatedAt()!=null && p.getCreatedAt().toLocalDate().equals(today))
                .mapToDouble(p->p.getPrice()*p.getQuantity())
                .sum();
    }

    @Override
    public double getMonthlySalesTotal() {
        YearMonth currentMonth = YearMonth.now();
        return productRepo.findAll().stream()
                .filter(p -> {
                    if (p.getCreatedAt() == null) return false;
                    YearMonth createdMonth = YearMonth.from(p.getCreatedAt());
                    return createdMonth.equals(currentMonth);
                })
                .mapToDouble(p -> p.getPrice() * p.getQuantity())
                .sum();
    }

    @Override
    public List<UserEntity> getAllUsers() {
        List<UserEntity> users=userRepo.findAll();
        if (!users.isEmpty())
            return users;
        return List.of();
    }

    @Override
    public List<Product> getAllProducts() {
        List<Product> productsList=productRepo.findAll();
        if (!productsList.isEmpty())
            return productsList;
        return List.of();
    }

    @Override
    public List<AdminEntity> getAllAdmins() {
        List<AdminEntity> adminsList=repo.findAll();
        if (!adminsList.isEmpty())
            return adminsList;
        return List.of();
    }
}
