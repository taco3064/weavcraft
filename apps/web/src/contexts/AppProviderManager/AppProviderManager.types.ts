import type { Palette } from '@mui/material/styles';
import type { ReactNode } from 'react';

import type { Credentials, PaletteCode } from '../imports.types';

export type CredentialKeys = keyof Credentials;
export type LanguageCode = string;

//* Custom Hooks
export interface AppSettingsContextValue {
  isTutorialMode: boolean;
  language: LanguageCode;
  palette: PaletteCode | Palette;
  languages: LanguageCode[];
  palettes: PaletteCode[];

  setLanguage: (language: LanguageCode) => void;
  setPalette: (palette: PaletteCode | Palette) => void;
}

//* Component Props
export interface AppProviderManagerProps {
  children: ReactNode;
  isTutorialMode: boolean;
}

export interface AppSettingsProviderProps {
  children: ReactNode;
  value: AppSettingsContextValue;
}
