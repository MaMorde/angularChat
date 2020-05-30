import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedUsername: string;
  public isAuth: boolean;
  private users: User[] = [];

  constructor(private router: Router) {}

  public initAuth() {
    this.isAuth = JSON.parse(localStorage.getItem('isAuth'));
    return this.isAuth;
  }
  public initLogged() {
    this.loggedUsername = JSON.parse(localStorage.getItem('loggedUser'));
    return this.loggedUsername;
  }
  public setAuth() {
    this.isAuth = true;
    localStorage.setItem('isAuth', JSON.stringify(this.isAuth));
  }
  public setLogged(username: string) {
    this.loggedUsername = username;
    localStorage.setItem('loggedUser', JSON.stringify(this.loggedUsername));
  }
  public initUsers(): User[] {
    this.users = JSON.parse(localStorage.getItem('users')) || [];
    return this.users;
  }

  public signupLocalUser(user: User) {
    this.users.push(user);
    this.loggedUsername = user.username;
    this.isAuth = true;
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  public logout() {
    this.isAuth = false;
    this.loggedUsername = '';
    localStorage.setItem('isAuth', JSON.stringify(this.isAuth));
    this.router.navigate(['/main']);
  }
}
