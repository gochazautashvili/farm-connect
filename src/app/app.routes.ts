import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.routes'),
  },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.routes') },
  { path: '', loadChildren: () => import('./modules/root/root.routes') },
];
