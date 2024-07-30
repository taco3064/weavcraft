import NextAuth from 'next-auth';
import type { UserData } from '@weavcraft/common';

import CredentialsProviders, {
  type CredentialInput,
} from 'next-auth/providers/credentials';

import './auth.types';
import { getCredentialTokens, getMe, doSingOut } from '~web/services';
import type { CredentialTokens, Credentials } from '../../imports.types';

const credentials: Record<keyof Credentials, CredentialInput> = {
  accessToken: { type: 'token' },
  providerToken: { type: 'token' },
  refreshToken: { type: 'token' },
  tokenType: { type: 'type' },
};

export default NextAuth({
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  providers: [
    CredentialsProviders({
      credentials,
      authorize: async (credentials) =>
        !credentials ? null : withMe(await getCredentialTokens(credentials)),
    }),
  ],
  events: {
    signOut: ({ token }) => doSingOut(token.refreshToken),
  },
  callbacks: {
    async redirect({ url }) {
      return url.replace(/#.*$/, '');
    },
    async jwt({ token, account, user }) {
      if (account) {
        const { tokens, ...me } = user;

        return { ...tokens, user: me };
      } else if (Date.now() < token.expiresAt) {
        return token;
      } else if (!token.refreshToken) {
        throw new Error('Missing refresh token');
      }

      try {
        const tokens = await getCredentialTokens(token.refreshToken);

        return { ...token, ...tokens };
      } catch (e) {
        console.error('Error refreshing access token', e);

        return { ...token, error: 'RefreshAccessTokenError' as const };
      }
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as UserData;
      }

      return session;
    },
  },
});

async function withMe(tokens: CredentialTokens) {
  const me = await getMe({
    queryKey: [
      {
        accessToken: tokens.accessToken,
        baseURL: process.env.NEXT_PUBLIC_API_URL,
      },
    ],
  });

  return { ...me, tokens };
}
