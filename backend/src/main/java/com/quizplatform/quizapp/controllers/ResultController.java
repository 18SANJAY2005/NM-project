package com.quizplatform.quizapp.controllers;

import com.quizplatform.quizapp.model.Result;
import com.quizplatform.quizapp.model.User;
import com.quizplatform.quizapp.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    @Autowired
    private ResultRepository resultRepository;

    @PostMapping("/submit")
    public String submitResult(@RequestBody Result result, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) return "Login required";

        result.setUserId(user.getId());
        resultRepository.save(result);
        return "Result submitted successfully";
    }

    @GetMapping("/my-results")
    public List<Result> getMyResults(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) return null;

        return resultRepository.findByUserId(user.getId());
    }

    @GetMapping("/all")
    public List<Result> getAllResults(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) return null;

        if ("ADMIN".equals(user.getRole())) {
            return resultRepository.findAll();
        } else {
            return null;
        }
    }
}
