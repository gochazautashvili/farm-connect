export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

export type IAuthState = IAuthLoading | IAuthError | IAuthSuccess;

interface IAuthSuccess {
  user: IUser;
  status: 'success';
}

interface IAuthError {
  user: null;
  status: 'error';
}

interface IAuthLoading {
  user: null;
  status: 'loading';
}
