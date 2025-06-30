import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/root/root.routes') },
  { path: '', loadChildren: () => import('./modules/auth/auth.routes') },
  {
    path: '',
    loadChildren: () => import('./modules/dashboard/dashboard.routes'),
  },
];
