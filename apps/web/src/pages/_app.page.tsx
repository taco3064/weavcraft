import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps as NextAppProps } from 'next/app';

import ThemeProvider from '~web/themes';
import { MuiSnackbarProvider } from '~web/styles';
import type { NextPageWithLayout } from '~web/hocs';
import '~web/locales';

//* Base Configs
const client = new QueryClient();

//* Custom App Component
export default function App({
  Component,
  pageProps,
}: NextAppProps & {
  Component: NextPageWithLayout;
}) {
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
