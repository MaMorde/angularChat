import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './pages/main/main.page';
import { LoginPageComponent } from './pages/login/login.page';
import { SignupPageComponent } from './pages/signup/signup.page';
import { ChatComponent } from './components/chat/chat.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthGuard2 } from './guards/auth2.guard';

const routes: Routes = [
  {
    path: 'main',
    component: MainPageComponent,
    canActivate: [AuthGuard2],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [AuthGuard2],
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    canActivate: [AuthGuard2],
  },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  {
    path: '',
    redirectTo: '/main',
    canActivate: [AuthGuard2],
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
