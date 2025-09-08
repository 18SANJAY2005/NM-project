package com.quizplatform.quizapp.repository;

import com.quizplatform.quizapp.model.Result;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ResultRepository extends MongoRepository<Result, String> {
    List<Result> findByUserId(String userId);
}
