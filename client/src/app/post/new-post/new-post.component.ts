import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../shared/post.model";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit, OnDestroy {
  post: Post  = {title: "", content:   ""};
  sub: Subscription;

  constructor(private router: Router) { }

  onPostSaved(event) {
    console.log('post was saved: ' + event);
    if (event) {
      this.router.navigate(['', 'post']);
    }
  }


  ngOnInit() {
    console.log('ngOnInit::NewPostComponent')
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy::NewPostComponent')
  }

}
