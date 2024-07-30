import Head from 'next/head';
import NextApp, { type AppContext } from 'next/app';
import _get from 'lodash/get';
import cookie from 'cookie';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { AppProviderManager } from '~web/contexts';
import type { AppProps } from './imports.types';

function App({ Component, pageProps, ...props }: AppProps) {
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

App.getInitialProps = async (appContext: AppContext) => {
  const req = appContext.ctx.req;
  const cookies = cookie.parse((req && _get(req, ['headers', 'cookie'])) || '');

  const { language = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE, palette } =
    cookies;

  // const token = await getToken({
  //   req: { ...req, cookies } as GetServerSidePropsContext['req'],
  //   secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  // });

  return {
    ...(await NextApp.getInitialProps(appContext)),
    defaultLanguage: language,
    defaultPalette: palette,
  };
};

export default appWithTranslation(App);
