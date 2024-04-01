import type { ComponentType, ReactElement, ReactNode, RefObject } from 'react';
import type { AppProps as NextAppProps } from 'next/app';
import type { NextPage } from 'next';

import type { PaletteCode } from '~web/themes';

type NextPageWithLayout<P = {}, InitialProps = P> = NextPage<
  P,
  InitialProps
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

//* Variables
export { PaletteCode };
export type LanguageCode = (typeof __WEBPACK_DEFINE__.I18N)['locales'][number];

//* Methods
export type SetterFns = {
  setLanguage: (language: LanguageCode) => void;
  setPalette: (palette: PaletteCode) => void;
};

//* HOCs & Custom Hooks
export interface AppSettingsContextValue {
  readonly language: LanguageCode;
  readonly palette: string;
  readonly languages: LanguageCode[];
  readonly palettes: PaletteCode[];

  setterRef: RefObject<SetterFns | undefined>;
}

export type MakePerPageLayout = <P = {}>(
  Layout: ComponentType<{ children: ReactNode }>
) => <InitialProps = P>(
  Page: NextPageWithLayout<P, InitialProps>
) => NextPageWithLayout<P, InitialProps>;

//* Component Props
export interface AppProviderManagerProps {
  children: ReactNode;
}

export type AppProps = NextAppProps & {
  Component: NextPageWithLayout;
};
