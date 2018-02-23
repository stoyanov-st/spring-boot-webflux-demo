package com.reactive.test.webfluxdemo.repository;

import com.reactive.test.webfluxdemo.model.User;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface UserRepository extends ReactiveMongoRepository<User, String>{

    Mono<User> findByUsername(String username);
}
