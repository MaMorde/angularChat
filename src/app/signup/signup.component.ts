import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  hide = true;
  users: User[];
  username: string;
  password: string;

  constructor(private router: Router, private Auth: AuthService) {}

  ngOnInit(): void {
    this.users = this.Auth.initUsers();
    this.username = '';
    this.password = '';
  }
  signupUser(): void {
    if (
      (this.username == null || this.username.trim() == '') &&
      (this.password == null || this.password.trim() == '')
    ) {
      alert('Придумайте логин и пароль');
      return;
    } else if (
      (this.username == null || this.username.trim() == '') &&
      this.password
    ) {
      alert('Придумайте логин');
      return;
    } else if (
      (this.password == null || this.password.trim() == '') &&
      this.username
    ) {
      alert('Придумайте пароль');
      return;
    }
    let newUser: User = {
      id: 'u' + Math.random().toString(36).substr(2, 9),
      username: this.username,
      password: this.password,
    };

    var chekUserName = false;
    if (localStorage.users) {
      for (let i = 0; i < eval(localStorage.users).length; i++) {
        if (
          eval(localStorage.users)[i].username.toLowerCase() !=
          this.username.trim().toLowerCase()
        ) {
          chekUserName = false;
        } else {
          chekUserName = true;
        }
      }
    } else {
      chekUserName = false;
    }

    if (chekUserName == true) {
      alert('Такое имя уже использовано, введите другое!');
      return;
    } else {
      this.Auth.signupLocalUser(newUser);
      this.Auth.setAuth();
      this.Auth.setLogged(this.username);
      this.username = this.password = '';
      this.router.navigate(['/chat']);
      this.users = this.Auth.initUsers();
    }
  }
}
