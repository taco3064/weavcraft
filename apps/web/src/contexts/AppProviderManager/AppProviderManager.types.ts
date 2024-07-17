import type { ComponentType, ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { Palette } from '@mui/material/styles';

import type { PaletteCode } from '../imports.types';

export type NextPageWithLayout<P = {}, InitialProps = P> = NextPage<
  P,
  InitialProps
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type LanguageCode = string;

//* Custom Hooks
export interface AppSettingsContextValue {
  readonly isTutorialMode: boolean;
  readonly language: LanguageCode;
  readonly palette: string | Palette;
  readonly languages: LanguageCode[];
  readonly palettes: PaletteCode[];
  readonly token?: string;

  setLanguage: (language: LanguageCode) => void;
  setPalette: (palette: PaletteCode | Palette) => void;
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
  defaultLanguage: LanguageCode;
  defaultPalette?: PaletteCode;
  isTutorialMode: boolean;
  token?: string;
}
