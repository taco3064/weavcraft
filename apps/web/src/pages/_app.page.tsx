import Cookies from 'js-cookie';
import Head from 'next/head';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { Provider } from '~web/contexts';
import type { AppProps } from './imports.types';

export default appWithTranslation(function App({
  Component,
  pageProps,
}: AppProps) {
  const { t } = useTranslation();
  const { locale, asPath, pathname, query, replace } = useRouter();

  const getLayout = Component.getLayout || ((page) => page);
  const isTutorialMode = asPath.startsWith('/tutorial');

  useEffect(() => {
    const language = Cookies.get('language');

    if (language && language !== locale) {
      replace({ pathname, query }, asPath, { locale: language });
    }
  }, [locale, asPath, pathname, query, replace]);

  return (
    <>
      <Head>
        <link rel="icon" href="/imgs/favicon.ico" />
        <title>{t('ttl-weavcraft')}</title>
      </Head>

      <Provider.AppSettings isTutorialMode={isTutorialMode}>
        {getLayout(<Component {...pageProps} />)}
      </Provider.AppSettings>
    </>
  );
});
