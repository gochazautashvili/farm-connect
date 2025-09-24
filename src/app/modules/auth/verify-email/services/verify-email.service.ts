import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { env } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class VerifyEmailService {
  private baseUrl = `${env.API_URL}/auth/verify-email`;

  private http = inject(HttpClient);

  public verify(data: { code: string; email: string }) {
    return this.http.post(`${this.baseUrl}/${data.email}/${data.code}`, {});
  }
}
