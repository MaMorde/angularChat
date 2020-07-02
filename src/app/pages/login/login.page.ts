import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}
  public hide = true;
  public username: string;
  public password: string;
  public loginUsernameControl: FormControl;
  public loginPasswordControl: FormControl;

  public ngOnInit(): void {
    this.username = '';
    this.password = '';
    this.loginUsernameControl = new FormControl('', [Validators.required]);
    this.loginPasswordControl = new FormControl('', [Validators.required]);
  }

  public loginIn(): void {
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
          this.auth.currentUser.next(this.username);
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
