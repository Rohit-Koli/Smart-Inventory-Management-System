package com.backend.repository;

import com.backend.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {
    Optional<UserEntity> findByEmail(String email);
    UserEntity findByEmailAndPassword(String email, String password);
    boolean existsByEmail(String email);
}
