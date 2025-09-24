import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import {
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';

import { AuthTokenService } from '../services/auth-token.service';

export const JwtAuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const tokenService = inject(AuthTokenService);
  const token = tokenService.getTokens().accessToken;

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
