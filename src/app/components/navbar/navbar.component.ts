import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private auth: AuthService) {}

  public getLoggedName() {
    return this.auth.current();
  }
  public logout(): void {
    this.auth.logout();
  }
}
