package com.backend.services;

import com.backend.entities.UserEntity;
import java.util.List;
import java.util.Optional;

public interface UserService {
    void saveUser(UserEntity user);
    UserEntity getUserById(Long userId);
    UserEntity updateUser(UserEntity user);
    boolean deleteUser(Long userId);
    boolean isUserExist(Long userId);
    boolean isUserExistByEmail(String email);
//    List<UserEntity> getAllUsers();
    boolean changePassword(Long id,String oldPassword,String newPassword);
    Optional<UserEntity> findByEmailAndPassword(String email,String password);
    UserEntity userDetails(String email);
}
