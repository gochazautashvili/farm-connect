import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { env } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private http = inject(HttpClient);
  private baseUrl = `${env.API_URL}/auth/reset-password`;

  public reset(data: IResetProps) {
    return this.http.post(this.baseUrl, data);
  }
}

interface IResetProps {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
