import type { SigninMethod } from '../useAppMenuItems';

export interface AuthState {
  isAuthenticated: boolean;
  signin(type: SigninMethod): Promise<void>;
  signout(): Promise<void>;
}
