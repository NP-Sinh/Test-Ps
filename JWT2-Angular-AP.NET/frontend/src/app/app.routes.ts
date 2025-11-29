import { Routes } from '@angular/router';
import { MainComponent } from './share/main.component/main.component';
import { SigninComponent } from './views/signin.component/signin.component';
import { HomeComponent } from './views/home.component/home.component';
import { authGuard } from './guard/auth.guard';
import { ProfileComponent } from './views/profile.component/profile.component';
import { UserManagementComponent } from './views/admin/managements/user-management.component/user-management.component';
import { adminGuard } from './guard/admin.guard';

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
        path: "admin/users",
        component: UserManagementComponent,
        canActivate: [adminGuard]
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ],
  },
];
