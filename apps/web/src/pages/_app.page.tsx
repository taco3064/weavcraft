import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import type { AppProps as NextAppProps } from 'next/app';

import type { NextPageWithLayout } from '~web/hocs';
import '~web/locales';

export default function App({
  Component,
  pageProps,
}: NextAppProps & {
  Component: NextPageWithLayout;
}) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const client = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={client}>
      {getLayout(<Component {...pageProps} />)}
    </QueryClientProvider>
  );
}
