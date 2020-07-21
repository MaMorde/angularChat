import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/user';
import { Igender } from 'src/app/interfaces/gender';
import { overSixteen } from 'src/app/validations/oversixteen.validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPageComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}
  public hide = true;
  public users: IUser[];
  public username: string;
  public password: string;
  public email: string;
  public city: string;
  public birthday: Date;
  public selectedGender: string;
  public dateNow: Date;
  public signupForm: FormGroup;
  public genders: Igender[] = [
    { value: 'man', viewValue: 'Мужской' },
    { value: 'women', viewValue: 'Женский' },
  ];

  public ngOnInit(): void {
    this.users = this.auth.initUsers();
    this.dateNow = new Date();
    this.signupForm = new FormGroup({
      usernameControl: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(3),
        Validators.pattern('^[A-Za-z]+[A-Za-z0-9]*$'),
      ]),
      passwordControl: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      emailControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      genderControl: new FormControl('', [Validators.required]),
      birthdayControl: new FormControl('', [
        Validators.required,
        overSixteen(),
      ]),
      cityControl: new FormControl('', [Validators.required]),
    });
  }

  public getDiffYear(): Date {
    const dateOffset = 24 * 60 * 60 * 1000 * 365 * 16; // 16 years
    this.dateNow.setTime(this.dateNow.getTime() - dateOffset);
    return this.dateNow;
  }
  public signupUser(): void {
    const newUser: IUser = {
      id: Math.random(),
      username: this.username,
      password: this.password,
      email: this.email,
      city: this.city,
      gender: this.selectedGender,
      birthday: this.birthday,
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
      this.auth.signupLocalUser(newUser);
      this.auth.setAuthUser(newUser);
      this.username = this.password = '';
      this.router.navigate(['/chat']);
      this.users = this.auth.initUsers();
      console.log(this.birthday);
    }
  }
}
