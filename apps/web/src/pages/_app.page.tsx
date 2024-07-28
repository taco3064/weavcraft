import App, { type AppContext } from 'next/app';
import Head from 'next/head';
import cookie from 'cookie';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import type { UserData } from '@weavcraft/common';

import { AppProviderManager } from '~web/contexts';
import { getMe, refreshTokens } from '~web/services';
import type { AppProps } from './imports.types';

function WeavcraftApp({ Component, pageProps, ...props }: AppProps) {
  const { t } = useTranslation();
  const { asPath } = useRouter();

  const getLayout = Component.getLayout || ((page) => page);
  const isTutorialMode = asPath.startsWith('/tutorial');

  return (
    <>
      <Head>
        <link rel="icon" href="/imgs/favicon.ico" />
        <title>{t('ttl-weavcraft')}</title>
      </Head>

      <AppProviderManager {...props} isTutorialMode={isTutorialMode}>
        {getLayout(<Component {...pageProps} />)}
      </AppProviderManager>
    </>
  );
}

WeavcraftApp.getInitialProps = async (appContext: AppContext) => {
  const { req, res } = appContext.ctx;

  const cookies: string[] = [
    cookie.serialize('accessToken', '', { maxAge: -1 }),
    cookie.serialize('refreshToken', '', { maxAge: -1 }),
    cookie.serialize('userinfo', '', { maxAge: -1 }),
  ];

  const {
    language = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE,
    palette,
    refreshToken,
    userinfo,
  } = cookie.parse(req?.headers.cookie || '');

  let user = userinfo
    ? (JSON.parse(decodeURIComponent(userinfo)) as UserData)
    : undefined;

  const tokens = !refreshToken
    ? null
    : await refreshTokens({
        refreshToken,
        baseURL: process.env.NEXT_PUBLIC_API_URL,
      });

  if (tokens) {
    user =
      user ||
      (await getMe({
        accessToken: tokens.accessToken,
        baseURL: process.env.NEXT_PUBLIC_API_URL,
      }));

    Object.entries(tokens).forEach(([key, value]) =>
      cookies.push(cookie.serialize(key, value, { path: '/' }))
    );

    cookies.push(
      cookie.serialize('userinfo', JSON.stringify(user), { path: '/' })
    );
  }

  res?.setHeader('Set-Cookie', cookies);

  return {
    ...(await App.getInitialProps(appContext)),
    ...tokens,
    defaultLanguage: language,
    defaultPalette: palette,
    userinfo: user,
  };
};

export default appWithTranslation(WeavcraftApp);
