import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (_, state) => {
  const authService = inject(AuthService);

  const data = authService.state();

  if (data.status === 'success') return true;

  return false;
};

export const authViewsGuard: CanActivateFn = (_, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const data = authService.state();

  if (data.status === 'success') return router.createUrlTree(['/']);

  return true;
};
