import type { ComponentType, ReactElement, ReactNode, RefObject } from 'react';
import type { AppProps as NextAppProps } from 'next/app';
import type { NextPage } from 'next';
import type { Palette } from '@mui/material/styles';

import type { PaletteCode, SigninInfo } from '../imports.types';

type NextPageWithLayout<P = {}, InitialProps = P> = NextPage<
  P,
  InitialProps
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export { PaletteCode };
export type LanguageCode = string;

export interface AuthInfo extends SigninInfo {
  expiresAt: number;
  expiresIn: number;
}

export type SetterFns = {
  setLanguage: (language: LanguageCode) => void;
  setPalette: (palette: PaletteCode | Palette) => void;
};

//* Custom Hooks
export interface AppSettingsContextValue {
  readonly isTutorialMode: boolean;
  readonly language: LanguageCode;
  readonly palette: string | Palette;
  readonly languages: LanguageCode[];
  readonly palettes: PaletteCode[];
  readonly token?: string;

  setterRef: RefObject<SetterFns | undefined>;
}

//* HOCs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MakePerPageLayout = <P = {}>(
  Layout: ComponentType<{ children: ReactNode }>
) => <InitialProps = P>(
  Page: NextPageWithLayout<P, InitialProps>
) => NextPageWithLayout<P, InitialProps>;

//* Component Props
export interface AppProviderManagerProps {
  children: ReactNode;
  isTutorialMode: boolean;
  token?: string;
}

export type AppProps = NextAppProps & {
  Component: NextPageWithLayout;
  token?: string;
};
