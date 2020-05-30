import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthGuard2 } from './guards/auth2.guard';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard2],
    data: { animation: 'isRight' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'isRight' },
    canActivate: [AuthGuard2],
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { animation: 'isRight' },
    canActivate: [AuthGuard2],
  },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  {
    path: '',
    redirectTo: '/main',
    canActivate: [AuthGuard2],
    pathMatch: 'full',
    data: { animation: 'isRight' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
