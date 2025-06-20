package com.backend.services;

import com.backend.entities.UserEntity;
import com.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
            existUser.setAbout(user.getAbout());
            existUser.setEmail(user.getEmail());
            existUser.setContact(user.getContact());
            existUser.setUsername(user.getUsername());
            existUser.setPassword(user.getPassword());
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

//    @Override
//    public List<UserEntity> getAllUsers() {
//        List<UserEntity> users=userRepo.findAll();
//        if (!users.isEmpty()){
//            return users;
//        }
//        return List.of();
//    }

    @Override
    public Optional<UserEntity> findByEmailAndPassword(String email, String password) {
        Optional<UserEntity> user=userRepo.findByEmailAndPassword(email,password);
        return user;
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
