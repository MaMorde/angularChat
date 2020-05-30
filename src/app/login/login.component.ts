import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  username: string;
  password: string;
  constructor(private router: Router, private AuthService: AuthService) {}

  ngOnInit(): void {
    this.username = '';
    this.password = '';
  }

  loginIn(): void {
    if (
      (this.username == null || this.username.trim() == '') &&
      (this.password == null || this.password.trim() == '')
    ) {
      alert('Введите логин и пароль');
      return;
    } else if (
      (this.username == null || this.username.trim() == '') &&
      this.password
    ) {
      alert('Введите логин');
      return;
    } else if (
      (this.password == null || this.password.trim() == '') &&
      this.username
    ) {
      alert('Введите пароль');
      return;
    }
    if (localStorage.users) {
      let userFound = false;
      for (let i = 0; i < eval(localStorage.users).length; i++) {
        if (
          eval(localStorage.users)[i].username == this.username.trim() &&
          eval(localStorage.users)[i].password == this.password
        ) {
          userFound = true;
          this.AuthService.loggedUsername = this.username;
          this.AuthService.setAuth();
          this.AuthService.setLogged(this.username);
          this.username = this.password = '';
          this.router.navigate(['/chat']);
          break;
        }
      }
      if (userFound == false) {
        alert(
          'Логин и пароль не совпадают. Возможно аккаунт не зарегистрирован.'
        );
      }
    }
  }
}
