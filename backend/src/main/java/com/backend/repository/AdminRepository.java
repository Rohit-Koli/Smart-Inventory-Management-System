package com.backend.repository;

import com.backend.entities.AdminEntity;
import com.backend.services.AdminService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity,Long> {
    Optional<AdminEntity> findByEmailAndPassword(String email,String password);
}
