package com.quizplatform.quizapp.service;

import com.quizplatform.quizapp.model.User;
import com.quizplatform.quizapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public String registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return "User already exists";
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "User registered successfully";
    }

    public User loginUser(String username, String password) {
        User existing = userRepository.findByUsername(username);
        if (existing != null && passwordEncoder.matches(password, existing.getPassword())) {
            return existing;
        }
        return null;
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}