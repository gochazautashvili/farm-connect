import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { env } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SendResetPasswordLinkService {
  private baseUrl = `${env.API_URL}/auth/send-reset-password-link`;
  private http = inject(HttpClient);

  public sendResetPasswordLink(email: string) {
    return this.http.post(`${this.baseUrl}/${email}`, {});
  }
}
