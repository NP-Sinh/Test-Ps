import { Routes } from '@angular/router';
import { MainComponent } from './share/main.component/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children:[

    ]
  }
];
