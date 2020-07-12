import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: Subject<IUser> = new Subject();
  private users: IUser[] = [];

  constructor(private router: Router) {
    this.currentUser.subscribe((user) =>
      localStorage.setItem('loggedUser', JSON.stringify(user))
    );
  }

  public getAuthUser(): IUser {
    return JSON.parse(localStorage.getItem('loggedUser'));
  }

  public setAuthUser(user: IUser) {
    this.currentUser.next(user);
  }
  public initUsers(): IUser[] {
    this.users = JSON.parse(localStorage.getItem('users')) || [];
    return this.users;
  }

  public signupLocalUser(user: IUser) {
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  public logout() {
    this.currentUser.next(null);
    this.router.navigate(['/main']);
  }
}
