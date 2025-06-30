import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./layout/layout.component'),
    children: [
      {
        path: 'register',
        loadComponent: () => import('./register/register.component'),
      },
      {
        path: 'login',
        loadComponent: () => import('./login/login.component'),
      },
    ],
  },
];

export default routes;
