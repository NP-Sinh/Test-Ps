import { Routes } from '@angular/router';
import { Main } from './share/main/main';
import { VaiTro } from './view/admin/vaitro/vaitro';
import { Dashboard } from './view/admin/dashboard/dashboard';

export const routes: Routes = [
  // {
  //   path: 'login',
  //   component: Login,
  // },
  {
    path: '',
    component: Main,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'vaitro',
        component: VaiTro,
      },
      {
        path: 'dashboard',
        component: Dashboard,
      },
    ],
  },
];
