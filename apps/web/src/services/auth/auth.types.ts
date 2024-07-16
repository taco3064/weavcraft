export type SigninProvider = 'google';

export interface SigninInfo {
  accessToken: string;
  providerToken: string;
  refreshToken: string;
  tokenType: string;
}

export interface SigninOptions {
  provider: SigninProvider;
  url: string;
}
