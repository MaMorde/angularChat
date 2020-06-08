import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  constructor(private auth: AuthService) {}
  public ngOnInit(): void {}
  public getLoggedName() {
    return this.auth.loggedUsername;
  }
  public logout(): void {
    this.auth.logout();
  }
}
