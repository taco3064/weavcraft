import Head from 'next/head';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { AppProviderManager } from '~web/contexts';
import type { AppProps } from './imports.types';

export default appWithTranslation(function App({
  Component,
  pageProps,
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

      <AppProviderManager isTutorialMode={isTutorialMode}>
        {getLayout(<Component {...pageProps} />)}
      </AppProviderManager>
    </>
  );
});
