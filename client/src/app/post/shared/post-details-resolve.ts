import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Post} from "./post.model";
import {PostService} from "./post.service";

@Injectable()
export class PostDetailsResolve implements Resolve<Post> {

  constructor(private postService: PostService) {
  }
  resolve(route: ActivatedRouteSnapshot) {
    return this.postService.getPosts(route.paramMap.get('slug'));
  }

}

