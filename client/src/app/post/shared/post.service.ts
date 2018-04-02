import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Post} from "./post.model";

const apiUrl = environment.apiUrl + '/posts';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) {
  }

  getPosts(term?: any): Observable<any> {
    const params: HttpParams = new HttpParams();
    Object.keys(term).map(key => {
      if (term[key]) {
        params.set(key, term[key]);
      }
    });
    return this.http.get(`${apiUrl}`, {params});
  }

  getPost(id: string): Observable<any> {
    return this.http.get(`${apiUrl}/${id}`);
  }

  savePost(data: Post) {
    console.log('saving post: ' + data);
    return this.http.post(`${apiUrl}`, data);
  }

  udpatePost(id: string, data: Post) {
    console.log('updating post: ' + data);
    return this.http.put(`${apiUrl}/${id}`, data);
  }

  deletePost(id: string) {
    console.log('deleting post: ' + id);
    return this.http.delete(`${apiUrl}/${id}`);
  }
}
