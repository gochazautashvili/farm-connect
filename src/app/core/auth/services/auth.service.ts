import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IApiResponse } from '@shared/models';

import { env } from 'src/environments/environment.development';
import { AuthTokenService } from './auth-token.service';
import { IAuthState, IUser } from '../models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenService = inject(AuthTokenService);
  private http = inject(HttpClient);
  private router = inject(Router);

  private baseUrl = `${env.API_URL}/auth/get-current-user`;

  public state = signal<IAuthState>({ status: 'loading', user: null });

  public loadUser() {
    this.http
      .get<IApiResponse<IUser>>(this.baseUrl)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (res) => this.state.set({ status: 'success', user: res.data }),
        error: () => this.state.set({ status: 'error', user: null }),
      });
  }

  public setUser(user: IUser) {
    this.state.set({ user, status: 'success' });
  }

  public logout() {
    this.tokenService.clearTokens();
    this.state.set({ status: 'error', user: null });
    this.router.navigateByUrl('/auth/login');
  }
}
