package com.reactive.test.webfluxdemo.repository;

import com.reactive.test.webfluxdemo.model.Post;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface PostRepository extends ReactiveMongoRepository<Post, String> {
}
