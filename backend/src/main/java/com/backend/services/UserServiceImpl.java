package com.backend.services;

import com.backend.entities.UserEntity;
import com.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
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
//        Optional<UserEntity> user =userRepo.findById(userId).isPresent()
        UserEntity getUser=userRepo.findById(userId).orElseThrow(()->new RuntimeException("User Not Found"));
        return getUser;
    }

    @Override
    public UserEntity updateUser(UserEntity user) {
        if (userRepo.existsByEmail(user.getEmail())){
            UserEntity existUser= new UserEntity();
            existUser.setAbout(user.getAbout());
            existUser.setContact(user.getContact());
            existUser.setPassword(user.getPassword());
            return userRepo.save(existUser);
        }
        return user;
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
    public List<UserEntity> getAllUsers() {
        List<UserEntity> users=userRepo.findAll();
        if (!users.isEmpty()){
            return users;
        }
        return List.of();
    }

    @Override
    public Optional<UserEntity> findByEmailAndPassword(String email, String password) {
        Optional<UserEntity> user=userRepo.findByEmailAndPassword(email,password);
        return user;
    }

    @Override
    public UserEntity userDetails(String email) {
        return null;
    }
}
