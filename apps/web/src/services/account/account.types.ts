export type SigninProvider = 'google';

export interface AccessTokenInfo {
  accessToken: string;
  providerToken: string;
  refreshToken: string;
  tokenType: string;
}

export interface AccessTokenWithExpiry extends AccessTokenInfo {
  expiresAt: number;
  expiresIn: number;
}

export interface SigninOptions {
  provider: SigninProvider;
  url: string;
}
