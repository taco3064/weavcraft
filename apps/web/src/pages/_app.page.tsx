import Head from 'next/head';
import { appWithTranslation, i18n, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';

import { AppProviderManager } from '~web/contexts';
import type { AppProps } from '~web/contexts';

function App({ Component, pageProps }: AppProps) {
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

      <AppProviderManager isTutorialMode={isTutorialMode}>
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
