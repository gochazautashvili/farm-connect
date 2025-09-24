import { Routes } from '@angular/router';

import { authViewsGuard } from '@core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [authViewsGuard],
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
      {
        path: 'verify-email',
        loadComponent: () => import('./verify-email/verify-email.component'),
      },
      {
        path: 'send-email-verification',
        loadComponent: () =>
          import('./send-email-verification/send-email-verification.component'),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import(
            './send-reset-password-link/send-reset-password-link.component'
          ),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./reset-password/reset-password.component'),
      },
    ],
  },
];

export default routes;
