import App, { type AppContext } from 'next/app';
import Head from 'next/head';
import cookie from 'cookie';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { AppProviderManager } from '~web/contexts';
import type { AppProps } from './pages.types';

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

  return {
    ...(await App.getInitialProps(appContext)),
    defaultLanguage: language,
    defaultPalette: palette,
    token,
  };
};

export default appWithTranslation(WeavcraftApp);
