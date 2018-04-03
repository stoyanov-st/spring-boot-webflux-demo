import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../shared/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../shared/post.model";
import {Observable, Subscription} from "rxjs/Rx";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  post: Post = {title: '', content: ''};
  slug: string;
  comments: Comment[] = [];
  sub: Subscription;

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params
      .flatMap( params => {
        this.slug = params['slug']
        return Observable.forkJoin(this.postService.getPost(this.slug), this.postService.getCommentsOfPost(this.slug));
      }).subscribe( (res: Array<any>) => {
        this.post = res[0];
        this.comments = res[1];
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
