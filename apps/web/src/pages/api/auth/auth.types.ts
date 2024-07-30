import type { UserData } from '@weavcraft/common';
import type { CredentialTokens } from '../../imports.types';

declare module 'next-auth' {
  interface Session {
    error?: 'RefreshAccessTokenError';
    user?: UserData;
  }

  interface User extends UserData {
    tokens: CredentialTokens;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    expiresAt: number;
    refreshToken: string;
    error?: 'RefreshAccessTokenError';
  }
}
