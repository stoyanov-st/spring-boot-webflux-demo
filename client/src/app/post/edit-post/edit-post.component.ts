import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../shared/post.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  post: Post = {title: '', content: ''};
  slug: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  onPostUpdated(event) {
    if (event) {
      this.router.navigate(['', 'post', 'list']);
    }
  }

  ngOnInit() {
    this.post = this.route.snapshot.data['post'];
  }

  ngOnDestroy(): void {
  }

}
