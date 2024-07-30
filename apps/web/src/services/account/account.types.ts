export type SigninProvider = 'google';

export interface Credentials {
  accessToken: string;
  providerToken: string;
  refreshToken: string;
  tokenType: string;
}

export interface CredentialTokens
  extends Pick<Credentials, 'accessToken' | 'refreshToken'> {
  expiresAt: number;
}

export interface MeOptions {
  accessToken: string;
  baseURL: string;
}

export interface SigninOptions {
  provider: SigninProvider;
  url: string;
}
