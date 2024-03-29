import type { AppProps as NextAppProps } from 'next/app';
import type { ComponentType, ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

import type { LanguageCode } from '~web/hooks';

type NextPageWithLayout<P = {}, InitialProps = P> = NextPage<
  P,
  InitialProps
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type MakePerPageLayout = <P = {}>(
  Layout: ComponentType<{ children: ReactNode }>
) => <InitialProps = P>(
  Page: NextPageWithLayout<P, InitialProps>
) => NextPageWithLayout<P, InitialProps>;

export type AppProps = NextAppProps & {
  Component: NextPageWithLayout;
  language: LanguageCode;
};
