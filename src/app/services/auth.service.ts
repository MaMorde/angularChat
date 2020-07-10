import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: IUser;
  public isAuth: boolean;
  private users: IUser[] = [];

  constructor(private router: Router) {}

  // public current(): IUser {
  //   return this.currentUser;
  // }
  public initAuth(): boolean {
    this.isAuth = JSON.parse(localStorage.getItem('isAuth'));
    return this.isAuth;
  }
  public initLogged(): IUser {
    this.currentUser = JSON.parse(localStorage.getItem('loggedUser'));
    return this.currentUser;
  }
  public setAuth() {
    this.isAuth = true;
    localStorage.setItem('isAuth', JSON.stringify(this.isAuth));
  }
  public setLogged(user: IUser) {
    this.currentUser = user;
    localStorage.setItem('loggedUser', JSON.stringify(this.currentUser));
  }
  public initUsers(): IUser[] {
    this.users = JSON.parse(localStorage.getItem('users')) || [];
    return this.users;
  }

  public signupLocalUser(user: IUser) {
    this.users.push(user);
    this.isAuth = true;
    this.currentUser = user;
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  public logout() {
    this.isAuth = false;
    this.currentUser = null;
    localStorage.setItem('isAuth', JSON.stringify(this.isAuth));
    this.router.navigate(['/main']);
  }
}
