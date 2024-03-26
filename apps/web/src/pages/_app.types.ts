import type { AppProps as NextAppProps } from 'next/app';
import type { ComponentType, ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

type NextPageWithLayout<P = {}, InitialProps = P> = NextPage<
  P,
  InitialProps
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type PerPageLayoutHoc = <P = {}>(
  Layout: ComponentType<{ children: ReactNode }>
) => <InitialProps = P>(
  Page: NextPageWithLayout<P, InitialProps>
) => NextPageWithLayout<P, InitialProps>;

export type AppProps = NextAppProps & {
  Component: NextPageWithLayout;
};
