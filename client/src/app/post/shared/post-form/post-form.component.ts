import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Post} from "../post.model";
import {Subscription} from "rxjs/Subscription";
import {PostService} from "../post.service";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit, OnDestroy {

  @Input() post: Post = {title: '', content: ''};
  @Output() save: EventEmitter<any> = new EventEmitter<any>();
  sub: Subscription;

  constructor(private postService: PostService) { }

  submit() {
    const _body = { title: this.post.title, content: this.post.content };

    if (this.post.id) {
      this.postService
        .updatePost(this.post.id, _body)
        .subscribe((data) => {
          this.save.emit(true)
        },
        (error) => this.save.emit(false)
        );
    } else {
      this.postService
        .savePost(_body)
        .subscribe( (data) => this.save.emit(true),
          (error) => this.save.emit(false))
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.sub) {}
      this.sub.unsubscribe();
  }

}
