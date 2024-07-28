import type { AxiosRequestConfig } from 'axios';

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

export interface MeOptions {
  accessToken: string;
  baseURL: string;
}

export interface RefreshTokensOptions {
  refreshToken: string;
  baseURL: string;
}

export interface SigninOptions {
  provider: SigninProvider;
  url: string;
}
