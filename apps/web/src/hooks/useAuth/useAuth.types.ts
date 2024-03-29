export const SIGNIN_METHODS = ['google'] as const;
export type SigninMethod = (typeof SIGNIN_METHODS)[number];

export interface AuthState {
  isAuthenticated: boolean;
  signin(type: SigninMethod): Promise<void>;
  signout(): Promise<void>;
}
