import { Routes } from '@angular/router';
import { MainComponent } from './share/main.component/main.component';
import { SigninComponent } from './views/signin.component/signin.component';
import { HomeComponent } from './views/home.component/home.component';
import { authGuard } from './guard/auth.guard';
import { ProfileComponent } from './views/profile.component/profile.component';
import { UserManagementComponent } from './views/admin/managements/user-management.component/user-management.component';
import { adminGuard } from './guard/admin.guard';
import { LoginComponent } from './views/admin/login.component/login.component';
import { DashboardComponent } from './views/admin/dashboard.component/dashboard.component';

export const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ],
  },
  // đây trang đăng nhập của admin
  {
    path: 'admin/login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: MainComponent,
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: 'admin/dashboard',
        component: DashboardComponent,
      },
      {
        path: 'admin/profile',
        component: ProfileComponent,
      },
      {
        path: 'admin/users',
        component: UserManagementComponent,
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
