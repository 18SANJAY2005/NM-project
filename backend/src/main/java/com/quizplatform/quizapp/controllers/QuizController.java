package com.quizplatform.quizapp.controllers;

import com.quizplatform.quizapp.model.Quiz;
import com.quizplatform.quizapp.model.Result;
import com.quizplatform.quizapp.model.User;
import com.quizplatform.quizapp.repository.QuizRepository;
import com.quizplatform.quizapp.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api")
public class QuizController {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private ResultRepository resultRepository;

    @GetMapping("/quizzes")
    public List<Quiz> getQuizzes() {
        return quizRepository.findAll();
    }

    @PostMapping("/quizzes")
    public String createQuiz(@RequestBody Quiz quiz, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null || !"ADMIN".equals(user.getRole())) {
            return "Unauthorized: Only admin can create quiz";
        }
        quizRepository.save(quiz);
        return "Quiz created successfully";
    }

    @PostMapping("/quiz-results")
    public String submitResult(@RequestBody Result result, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) return "Login required";

        result.setUserId(user.getId());
        resultRepository.save(result);
        return "Result submitted successfully";
    }

    @GetMapping("/results")
    public List<Result> getAllResults(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) return null;

        if ("ADMIN".equals(user.getRole())) {
            return resultRepository.findAll();
        } else {
            return resultRepository.findByUserId(user.getId());
        }
    }
}
