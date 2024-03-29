import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { useEffect } from 'react';

import ThemeProvider from '~web/themes';
import { NotistackProvider } from '~web/contexts';
import { useSettings } from '~web/hooks';
import type { AppProps, MakePerPageLayout } from './_app.types';

//* Base Configs
const client = new QueryClient();

//* HOCs
export const makePerPageLayout: MakePerPageLayout = (Layout) => (Page) => {
  Page.getLayout = (page) => <Layout>{page}</Layout>;

  return Page;
};

//* Custom App Component
function App({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();
  const { language, palette } = useSettings();
  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  return (
    <>
      <Head>
        <link rel="icon" href="/imgs/favicon.ico" />
        <title>Weavcraft</title>
      </Head>

      <QueryClientProvider client={client}>
        <ThemeProvider palette={palette}>
          <NotistackProvider>
            {getLayout(<Component {...pageProps} />)}
          </NotistackProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default appWithTranslation(App, { i18n: __WEBPACK_DEFINE__.I18N });
