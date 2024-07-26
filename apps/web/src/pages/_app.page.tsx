import App, { type AppContext } from 'next/app';
import Cookies from 'js-cookie';
import Head from 'next/head';
import cookie from 'cookie';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { AppProviderManager } from '~web/contexts';
import { setAuthorizationInterceptor } from '~web/services';
import type { AppProps } from './imports.types';

function WeavcraftApp({
  Component,
  accessToken,
  defaultLanguage,
  defaultPalette,
  pageProps,
  refreshToken,
}: AppProps) {
  const { t } = useTranslation();
  const { asPath } = useRouter();

  const getLayout = Component.getLayout || ((page) => page);
  const isTutorialMode = asPath.startsWith('/tutorial');

  useEffect(() => {
    if (accessToken) {
      setAuthorizationInterceptor({
        accessToken,
        onUnauthorized: () => {
          Cookies.remove('accessToken');
          global.location?.reload();
        },
      });
    }

    return () => setAuthorizationInterceptor(false);
  }, [accessToken]);

  return (
    <>
      <Head>
        <link rel="icon" href="/imgs/favicon.ico" />
        <title>{t('ttl-weavcraft')}</title>
      </Head>

      <AppProviderManager
        {...{
          accessToken,
          defaultLanguage,
          defaultPalette,
          isTutorialMode,
          refreshToken,
        }}
      >
        {getLayout(<Component {...pageProps} />)}
      </AppProviderManager>
    </>
  );
}

WeavcraftApp.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;

  const {
    accessToken,
    language = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE,
    palette,
    refreshToken,
  } = cookie.parse(ctx.req?.headers.cookie || '');

  setAuthorizationInterceptor(
    !accessToken
      ? false
      : {
          accessToken,
          onUnauthorized: () =>
            cookie.serialize('accessToken', '', { maxAge: -1 }),
        }
  );

  return {
    ...(await App.getInitialProps(appContext)),
    accessToken,
    defaultLanguage: language,
    defaultPalette: palette,
    refreshToken,
  };
};

export default appWithTranslation(WeavcraftApp);
