import { Routes } from '@angular/router';
import { MainLayout } from './shared/main-layout/main-layout';
import { Home } from './views/home/home';
import { Picture } from './views/picture/picture/picture';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: Home

        ,
      },
      {
        path: 'admin/picture',
        component: Picture,
      },
    ],
  },
];
