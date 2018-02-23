package com.reactive.test.webfluxdemo.service;

import com.reactive.test.webfluxdemo.model.Post;
import com.reactive.test.webfluxdemo.model.User;
import com.reactive.test.webfluxdemo.repository.PostRepository;
import com.reactive.test.webfluxdemo.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

import java.util.Arrays;
import java.util.List;

@Component
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final PostRepository posts;
    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(PostRepository posts, UserRepository users, PasswordEncoder passwordEncoder) {
        this.posts = posts;
        this.users = users;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        log.info("start data init...");
        this.posts
                .deleteAll()
                .thenMany(
                        Flux
                            .just("Post one", "Post two")
                            .flatMap(
                                    title -> this.posts.save(Post.builder().title(title).content("content of " + title).build())
                            )
                )
                .log()
                .subscribe(
                        null,
                        null,
                        () -> log.info("done init...")
                );

        this.users
                .deleteAll()
                .thenMany(
                        Flux
                                .just("user", "admin")
                                .flatMap(
                                        username -> {
                                            List<String> roles = "user".equals(username)
                                                    ? Arrays.asList("ROLE_USER")
                                                    : Arrays.asList("ROLE_USER", "ROLE_ADMIN");

                                            User user = User.builder()
                                                    .roles(roles)
                                                    .username(username)
                                                    .password(passwordEncoder.encode("password"))
                                                    .email(username + "@example.com")
                                                    .build();
                                            return this.users.save(user);
                                        }
                                )
                )
                .log()
                .subscribe(
                        null,
                        null,
                        () -> log.info("done users initialization...")
                );
    }
}
