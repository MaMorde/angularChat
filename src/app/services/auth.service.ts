import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  public currentUser: BehaviorSubject<IUser> = new BehaviorSubject(null);
  private users: IUser[] = [];

  constructor(private router: Router) {}

  // public current(): IUser {
  //   return this.currentUser;
  // }
  public ngOnInit() {
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
  }
}
