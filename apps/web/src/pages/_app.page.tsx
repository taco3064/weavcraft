import Head from 'next/head';
import { appWithTranslation, i18n, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetServerSideProps } from 'next';

import { AppProviderManager } from '~web/contexts';
import type { AppProps } from '~web/contexts';

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

export default appWithTranslation(App);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const { NEXT_PUBLIC_DEFAULT_LANGUAGE } = process.env;

  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources();
  }

  return {
    props: {
      ...(await serverSideTranslations(locale || NEXT_PUBLIC_DEFAULT_LANGUAGE, [
        'common',
      ])),
    },
  };
};
