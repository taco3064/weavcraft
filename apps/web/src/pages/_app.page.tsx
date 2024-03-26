import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ThemeProvider from '~web/themes';
import { MuiSnackbarProvider } from '~web/styles';
import type { AppProps, PerPageLayoutHoc } from './_app.types';
import '~web/locales';

//* Base Configs
const client = new QueryClient();

//* HOCs
export const withPerPageLayout: PerPageLayoutHoc = (Layout) => (Page) => {
  Page.getLayout = (page) => <Layout>{page}</Layout>;

  return Page;
};

//* Custom App Component
export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider>
        <MuiSnackbarProvider>
          {getLayout(<Component {...pageProps} />)}
        </MuiSnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
