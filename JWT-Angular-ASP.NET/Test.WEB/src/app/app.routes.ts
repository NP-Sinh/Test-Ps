import { Routes } from '@angular/router';
import { MainComponent } from './share/main.component/main.component';
import { SigninComponent } from './views/signin.component/signin.component';
import { ProfileComponent } from './views/profile.component/profile.component';
import { AuthGuard } from './Guards/auth.guard';
import { UserManagementComponent } from './views/management/user-management.component/user-management.component';
import { AdminGuard } from './Guards/admin.guard';
import { HomeComponent } from './views/home.component/home.component';

export const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
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
        path: 'admin/users',
        component: UserManagementComponent,
        canActivate: [AdminGuard],
      },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ],
  },
];
