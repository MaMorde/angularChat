import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPageComponent implements OnInit {
  public hide = true;
  public users: IUser[];
  public username: string;
  public password: string;
  public signupUsernameControl: FormControl;
  public signupPasswordControl: FormControl;

  constructor(private router: Router, private Auth: AuthService) {}

  public ngOnInit(): void {
    this.users = this.Auth.initUsers();
    this.username = '';
    this.password = '';
    this.signupUsernameControl = new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(3),
      Validators.pattern('^[A-Za-z]+[A-Za-z0-9]*$'),
    ]);
    this.signupPasswordControl = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]);
  }
  public signupUser(): void {
    const newUser: IUser = {
      id: Math.random(),
      username: this.username,
      password: this.password,
    };

    let chekUserName = false;
    if (localStorage.users) {
      // tslint:disable-next-line:no-eval
      for (let i = 0; i < eval(localStorage.users).length; i++) {
        if (
          // tslint:disable-next-line:no-eval
          eval(localStorage.users)[i].username.toLowerCase() !==
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

    if (chekUserName === true) {
      alert('Такое имя уже использовано, введите другое!');
      return;
    } else {
      this.Auth.signupLocalUser(newUser);
      this.Auth.setAuthUser(newUser);
      this.username = this.password = '';
      this.router.navigate(['/chat']);
      this.users = this.Auth.initUsers();
    }
  }
}
