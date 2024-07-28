import type { Palette } from '@mui/material/styles';
import type { ReactNode } from 'react';
import type { UserData } from '@weavcraft/common';

import type { AccessTokenInfo, PaletteCode } from '../imports.types';

export type Tokens = Partial<
  Pick<AccessTokenInfo, 'accessToken' | 'refreshToken'>
>;

export type LanguageCode = string;

//* Custom Hooks
export interface AppSettingsContextValue extends Readonly<Tokens> {
  readonly isTutorialMode: boolean;
  readonly language: LanguageCode;
  readonly palette: string | Palette;
  readonly languages: LanguageCode[];
  readonly palettes: PaletteCode[];
  readonly userinfo?: Readonly<UserData>;

  setLanguage: (language: LanguageCode) => void;
  setPalette: (palette: PaletteCode | Palette) => void;
}

//* Component Props
export interface AppProviderManagerProps extends Tokens {
  children: ReactNode;
  defaultLanguage: LanguageCode;
  defaultPalette?: PaletteCode;
  isTutorialMode: boolean;
  userinfo?: Readonly<UserData>;
}

export interface AppSettingsProviderProps {
  children: ReactNode;
  value: AppSettingsContextValue;
}
