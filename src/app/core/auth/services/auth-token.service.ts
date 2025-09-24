import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenService {
  private accessTokenName = 'AccessToken';
  private refreshTokenName = 'RefreshToken';

  public setTokens(data: { accessToken: string; refreshToken: string }) {
    localStorage.setItem(this.refreshTokenName, data.refreshToken);
    localStorage.setItem(this.accessTokenName, data.accessToken);
  }

  public getTokens() {
    const accessToken = localStorage.getItem(this.accessTokenName);
    const refreshToken = localStorage.getItem(this.refreshTokenName);

    return { accessToken, refreshToken };
  }

  public clearTokens() {
    localStorage.removeItem(this.accessTokenName);
    localStorage.removeItem(this.refreshTokenName);
  }
}
