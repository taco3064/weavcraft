import App, { type AppContext } from 'next/app';
import Head from 'next/head';
import cookie from 'cookie';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { AppProviderManager } from '~web/contexts';
import type { AppProps } from '~web/contexts';

function WeavcraftApp({ Component, pageProps, token }: AppProps) {
  const { asPath } = useRouter();
  const { t } = useTranslation();

  const getLayout = Component.getLayout || ((page) => page);
  const isTutorialMode = asPath.startsWith('/tutorial');

  return (
    <>
      <Head>
        <link rel="icon" href="/imgs/favicon.ico" />
        <title>{t('ttl-weavcraft')}</title>
      </Head>

      <AppProviderManager {...{ isTutorialMode, token }}>
        {getLayout(<Component {...pageProps} />)}
      </AppProviderManager>
    </>
  );
}

WeavcraftApp.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;
  const { token } = cookie.parse(ctx.req?.headers.cookie || '');

  return {
    ...(await App.getInitialProps(appContext)),
    token,
  };
};

export default appWithTranslation(WeavcraftApp);
