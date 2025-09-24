import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { env } from 'src/environments/environment.development';
import { ILoginForm, ILoginResponse } from '../models';
import { IApiResponse } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = `${env.API_URL}/auth/login-user`;

  private http = inject(HttpClient);

  public login(data: ILoginForm) {
    return this.http.post<IApiResponse<ILoginResponse>>(this.baseUrl, data);
  }
}
