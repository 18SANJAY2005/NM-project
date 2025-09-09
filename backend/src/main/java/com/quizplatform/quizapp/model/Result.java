package com.quizplatform.quizapp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "results")
public class Result {
    @Id
    private String id;
    private String userId;
    private String quizId;
    private int score;
}