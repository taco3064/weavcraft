import Head from 'next/head';
import { appWithTranslation, useTranslation } from 'next-i18next';

import { AppProviderManager } from '~web/contexts';
import { I18N_USER_CONFIG, type AppProps } from '~web/contexts';

function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page);
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <link rel="icon" href="/imgs/favicon.ico" />
        <title>{t('ttl-weavcraft')}</title>
      </Head>

      <AppProviderManager>
        {getLayout(<Component {...pageProps} />)}
      </AppProviderManager>
    </>
  );
}

export default appWithTranslation(App, I18N_USER_CONFIG);
