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
  defaultLanguage,
  defaultPalette,
  pageProps,
  token,
}: AppProps) {
  const { t } = useTranslation();
  const { asPath } = useRouter();

  const getLayout = Component.getLayout || ((page) => page);
  const isTutorialMode = asPath.startsWith('/tutorial');

  useEffect(() => {
    if (token) {
      setAuthorizationInterceptor({
        token,
        onUnauthorized: () => {
          Cookies.remove('token');
          global.location?.reload();
        },
      });
    }

    return () => setAuthorizationInterceptor(false);
  }, [token]);

  return (
    <>
      <Head>
        <link rel="icon" href="/imgs/favicon.ico" />
        <title>{t('ttl-weavcraft')}</title>
      </Head>

      <AppProviderManager
        {...{ defaultLanguage, defaultPalette, isTutorialMode, token }}
      >
        {getLayout(<Component {...pageProps} />)}
      </AppProviderManager>
    </>
  );
}

WeavcraftApp.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;

  const {
    language = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE,
    palette,
    token,
  } = cookie.parse(ctx.req?.headers.cookie || '');

  setAuthorizationInterceptor(
    !token
      ? false
      : {
          token,
          onUnauthorized: () => cookie.serialize('token', '', { maxAge: -1 }),
        }
  );

  return {
    ...(await App.getInitialProps(appContext)),
    defaultLanguage: language,
    defaultPalette: palette,
    token,
  };
};

export default appWithTranslation(WeavcraftApp);
