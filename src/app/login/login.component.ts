import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public hide = true;
  public username: string;
  public password: string;
  constructor(private router: Router, private auth: AuthService) {}

  public ngOnInit(): void {
    this.username = '';
    this.password = '';
  }

  public loginIn(): void {
    if (
      (this.username === null || this.username.trim() === '') &&
      (this.password === null || this.password.trim() === '')
    ) {
      alert('Введите логин и пароль');
      return;
    } else if (
      (this.username === null || this.username.trim() === '') &&
      this.password
    ) {
      alert('Введите логин');
      return;
    } else if (
      (this.password === null || this.password.trim() === '') &&
      this.username
    ) {
      alert('Введите пароль');
      return;
    }
    if (localStorage.users) {
      let userFound = false;
      // tslint:disable-next-line:no-eval
      for (let i = 0; i < eval(localStorage.users).length; i++) {
        if (
          // tslint:disable-next-line:no-eval
          eval(localStorage.users)[i].username === this.username.trim() &&
          // tslint:disable-next-line:no-eval
          eval(localStorage.users)[i].password === this.password
        ) {
          userFound = true;
          this.auth.loggedUsername = this.username;
          this.auth.setAuth();
          this.auth.setLogged(this.username);
          this.username = this.password = '';
          this.router.navigate(['/chat']);
          break;
        }
      }
      if (userFound === false) {
        alert(
          'Логин и пароль не совпадают. Возможно аккаунт не зарегистрирован.'
        );
      }
    }
  }
}
