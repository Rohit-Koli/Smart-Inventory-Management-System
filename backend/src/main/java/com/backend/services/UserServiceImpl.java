package com.backend.services;

import com.backend.entities.UserEntity;
import com.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepo;

    @Override
    public void saveUser(UserEntity user) {
        userRepo.save(user);
    }

    @Override
    public UserEntity getUserById(Long userId) {
        UserEntity getUser=userRepo.findById(userId).orElse(null);
        return getUser;
    }

    @Override
    public UserEntity updateUser(UserEntity user) {
        Optional<UserEntity> optionalUser = userRepo.findById(user.getId());
        if (optionalUser.isPresent()){
            UserEntity existUser=optionalUser.get();
            if (user.getAbout() != null) {
                existUser.setAbout(user.getAbout());
            }
            if (user.getEmail() != null) {
                existUser.setEmail(user.getEmail());
            }
            if (user.getContact() != null) {
                existUser.setContact(user.getContact());
            }
            if (user.getUsername() != null) {
                existUser.setUsername(user.getUsername());
            }
            if (user.getPassword() != null) {
                existUser.setPassword(user.getPassword());
            }
            return userRepo.save(existUser);
        }
        return null;
    }

    @Override
    public boolean deleteUser(Long userId) {
        if(userRepo.findById(userId).isPresent()){
            userRepo.deleteById(userId);
            return true;
        }
        return false;
    }

    @Override
    public boolean isUserExist(Long userId) {
        return userRepo.existsById(userId);
    }

    @Override
    public boolean isUserExistByEmail(String email) {
        return userRepo.existsByEmail(email);
    }

    @Override
    public boolean changePassword(Long id, String oldPassword, String newPassword) {
        Optional<UserEntity> updateUser=userRepo.findById(id);
        if (updateUser.isPresent()){
            UserEntity user =updateUser.get();
            if (!user.getPassword().equals(oldPassword)){
                return false;
            }
            user.setPassword(newPassword);
            return true;
        }
        return false;
    }

    @Override
    public ResponseEntity<UserEntity> userLogin(String email, String password) {
        if (email==null || password==null){
            return ResponseEntity.badRequest().build();
        }
        UserEntity user=userRepo.findByEmailAndPassword(email, password);
        if (user==null || !password.equals(user.getPassword())){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(user);
    }


    @Override
    public UserEntity userDetails(String email) {
        Optional<UserEntity> user=userRepo.findByEmail(email);
        if (user.isPresent()){
            return user.get();
        }
        return null;
    }
}
