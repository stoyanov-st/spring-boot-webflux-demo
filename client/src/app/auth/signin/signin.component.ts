import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import {AuthService} from "../../core/auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  private username = '';
  private password = '';
  errorMessage = '';

  sub: Subscription = null;


  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    this.auth.attempAuth({ username: this.username, password: this.password})
      .subscribe(
        (data) => this.router.navigate(['']),
        (err) => {
          this.errorMessage = 'login failed';
          return;
        }
      )
  }
}
