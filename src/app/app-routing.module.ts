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
    data: { animation: 'isRight' },
  },
  {
    path: 'login',
    component: LoginPageComponent,
    data: { animation: 'isRight' },
    canActivate: [AuthGuard2],
  },
  {
    path: 'signup',
    component: SignupPageComponent,
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
