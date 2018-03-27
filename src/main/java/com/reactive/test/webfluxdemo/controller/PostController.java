package com.reactive.test.webfluxdemo.controller;

import com.reactive.test.webfluxdemo.exception.PostNotFoundException;
import com.reactive.test.webfluxdemo.model.Post;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.reactive.test.webfluxdemo.repository.PostRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@RestController()
@RequestMapping(value = "/posts")
public class PostController {

    private final PostRepository posts;

    public PostController(PostRepository posts) {
        this.posts = posts;
    }

    @GetMapping("")
    public Flux<Post> all() {
        return this.posts.findAll();
    }

    @PostMapping("")
    public Mono<Post> create(@RequestBody Post post) {
        return this.posts.save(post);
    }

    @GetMapping("/{id}")
    public Mono<Post> get(@PathVariable("id") String id) {
        return this.posts
                .findById(id)
                .switchIfEmpty(
                        Mono.error(
                                new PostNotFoundException(id)
                        )
                );
    }

    @PutMapping("/{id}")
    public Mono<Post> update(@PathVariable("id") String id, @RequestBody Post post) {
        return this.posts.findById(id)
                .map(p -> {
                    p.setTitle(post.getTitle());
                    p.setContent(post.getContent());

                    return p;
                })
                .flatMap(this.posts::save);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> delete(@PathVariable("id") String id) {
        return this.posts.deleteById(id);
    }
}
