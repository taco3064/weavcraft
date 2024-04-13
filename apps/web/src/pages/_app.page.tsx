import Head from 'next/head';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';

import { AppProviderManager } from '~web/contexts';
import { getServerSideTranslations } from './pages.utils';
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

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await getServerSideTranslations(ctx)),
  },
});
