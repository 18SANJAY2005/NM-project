package com.quizplatform.quizapp.service;

import com.quizplatform.quizapp.model.User;
import com.quizplatform.quizapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register a new user
    public String registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return "User already exists";
        }
        userRepository.save(user);
        return "User registered successfully";
    }

    // Login a user
    public User loginUser(String username, String password) {
        User existing = userRepository.findByUsername(username);
        if (existing != null && existing.getPassword().equals(password)) {
            return existing;
        }
        return null;
    }

    // Find user by username
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
