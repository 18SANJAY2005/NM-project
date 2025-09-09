package com.quizplatform.quizapp.controllers;

import com.quizplatform.quizapp.model.Quiz;
import com.quizplatform.quizapp.model.User;
import com.quizplatform.quizapp.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    @Autowired
    private QuizRepository quizRepository;

    @GetMapping
    public ResponseEntity<List<Quiz>> getQuizzes() {
        return ResponseEntity.ok(quizRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable String id) {
        Optional<Quiz> quiz = quizRepository.findById(id);
        return quiz.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<String> createQuiz(@RequestBody Quiz quiz, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null || !"ADMIN".equals(user.getRole())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: Only admin can create quiz");
        }
        quizRepository.save(quiz);
        return ResponseEntity.ok("Quiz created successfully");
    }
}