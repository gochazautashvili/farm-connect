import { IUser } from "@core/auth/models";

export interface ILoginForm {
  email: string;
  password: string;
}

export interface ILoginResponse {
  refreshToken: string;
  accessToken: string;
  currentUser: IUser
}
