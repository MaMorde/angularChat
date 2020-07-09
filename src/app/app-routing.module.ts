import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './pages/main/main.page';
import { LoginPageComponent } from './pages/login/login.page';
import { SignupPageComponent } from './pages/signup/signup.page';
import { ChatComponent } from './components/chat/chat.component';
import { AuthGuard } from './guards/auth.guard';
import { ChatGuard } from './guards/chat.guard';

const routes: Routes = [
  {
    path: 'main',
    component: MainPageComponent,
    canActivate: [ChatGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [ChatGuard],
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    canActivate: [ChatGuard],
  },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  {
    path: '',
    redirectTo: '/main',
    canActivate: [ChatGuard],
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
