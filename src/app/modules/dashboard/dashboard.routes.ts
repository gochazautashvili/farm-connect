import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./layout/layout.component'),
    children: [],
  },
];

export default routes;
