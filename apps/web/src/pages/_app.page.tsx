import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

import { AppProviderManager } from '~web/contexts';
import { I18N_USER_CONFIG, useTranslationSyncEffect } from '~web/contexts';
import type { AppProps, MakePerPageLayout } from './_app.types';

//* HOCs
export const makePerPageLayout: MakePerPageLayout = (Layout) => (Page) => {
  Page.getLayout = (page) => <Layout>{page}</Layout>;

  return Page;
};

//* Custom App Component
function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page);

  useTranslationSyncEffect();

  return (
    <>
      <Head>
        <link rel="icon" href="/imgs/favicon.ico" />
        <title>Weavcraft</title>
      </Head>

      <AppProviderManager>
        {getLayout(<Component {...pageProps} />)}
      </AppProviderManager>
    </>
  );
}

export default appWithTranslation(App, I18N_USER_CONFIG);
