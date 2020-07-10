import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: IUser;
  private users: IUser[] = [];

  constructor(private router: Router) {}

  // public current(): IUser {
  //   return this.currentUser;
  // }

  public initLogged(): IUser {
    this.currentUser = JSON.parse(localStorage.getItem('loggedUser'));
    return this.currentUser;
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
    this.currentUser = user;
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  public logout() {
    this.currentUser = null;
    localStorage.setItem('loggedUser', JSON.stringify(this.currentUser));
    this.router.navigate(['/main']);
  }
}
