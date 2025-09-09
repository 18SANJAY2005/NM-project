package com.quizplatform.quizapp.controllers;

import com.quizplatform.quizapp.model.Result;
import com.quizplatform.quizapp.model.User;
import com.quizplatform.quizapp.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    @Autowired
    private ResultRepository resultRepository;

    @PostMapping("/submit")
    public ResponseEntity<String> submitResult(@RequestBody Result result, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login required");
        }
        result.setUserId(user.getId());
        resultRepository.save(result);
        return ResponseEntity.ok("Result submitted successfully");
    }

    @GetMapping("/my-results")
    public ResponseEntity<List<Result>> getMyResults(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(resultRepository.findByUserId(user.getId()));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Result>> getAllResults(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null || !"ADMIN".equals(user.getRole())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(resultRepository.findAll());
    }
}