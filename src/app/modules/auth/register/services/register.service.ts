import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { env } from 'src/environments/environment.development';
import { IRegisterFormData } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private baseUrl = `${env.API_URL}/auth/register-user`;

  private http = inject(HttpClient);

  public register(data: IRegisterFormData) {
    return this.http.post(this.baseUrl, data);
  }
}
