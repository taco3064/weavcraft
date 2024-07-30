import type { AppProps as NextAppProps } from 'next/app';
import type { ComponentType, ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

import type { HierarchyData, SuperiorHierarchy } from '~web/services';
import type { LanguageCode } from '~web/contexts';
import type { PaletteCode } from '~web/themes';

export type * from '~web/components';
export type * from '~web/containers';
export type * from '~web/contexts';
export type * from '~web/hooks';
export type * from '~web/services';
export type * from '~web/themes';

type NextPageWithLayout<P = {}, InitialProps = P> = NextPage<
  P,
  InitialProps
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface AppProps extends NextAppProps {
  Component: NextPageWithLayout;
  defaultLanguage: LanguageCode;
  defaultPalette?: PaletteCode;
}

export interface BaseHierarchyProps<P = never> {
  group?: string;
  initialData: HierarchyData<P>[];
  initialSuperiors: SuperiorHierarchy[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MakePerPageLayout = <P = {}>(
  Layout: ComponentType<{ children: ReactNode }>
) => <InitialProps = P>(
  Page: NextPageWithLayout<P, InitialProps>
) => NextPageWithLayout<P, InitialProps>;
