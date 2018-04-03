import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../shared/post.model";
import {Router} from "@angular/router";
import {PostService} from "../shared/post.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[];
  q = null;
  sub: Subscription;
  constructor(private  router: Router, private postService: PostService) { }

  search() {
    this.sub = this.postService.getPosts({ q: this.q })
      .subscribe(
        data => this.posts = data,
        err => console.log(err)
      );
  }

  searchByTerm($event) {
    this.updateTerm($event);
    this.search();
  }

  updateTerm($event: any) {
    this.q = $event;
  }

  clearTerm($event) {
    this.q = null;
  }

  addPost() {
    this.router.navigate(['', 'post', 'new'])
  }

  ngOnInit() {
    this.search();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
