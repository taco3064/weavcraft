import Head from 'next/head';
import i18n from 'i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initReactI18next } from 'react-i18next';

import ThemeProvider from '~web/themes';
import resources from '@alienfast/i18next-loader?relativePathAsNamespace=true!~web/locales';
import { NotistackProvider } from '~web/contexts';
import type { AppProps, MakePerPageLayout } from './_app.types';

//* Base Configs
const client = new QueryClient();

i18n.use(initReactI18next).init({
  keySeparator: '.',
  resources,
  lng: global.localStorage?.getItem('lng') || __WEBPACK_DEFINE__.LANGUAGES[0],
  fallbackLng: {
    default: __WEBPACK_DEFINE__.LANGUAGES,
  },
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
});

//* HOCs
export const makePerPageLayout: MakePerPageLayout = (Layout) => (Page) => {
  Page.getLayout = (page) => <Layout>{page}</Layout>;

  return Page;
};

//* Custom App Component
export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <link rel="icon" href="/imgs/favicon.ico" />
        <title>Weavcraft</title>
      </Head>

      <QueryClientProvider client={client}>
        <ThemeProvider>
          <NotistackProvider>
            {getLayout(<Component {...pageProps} />)}
          </NotistackProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
