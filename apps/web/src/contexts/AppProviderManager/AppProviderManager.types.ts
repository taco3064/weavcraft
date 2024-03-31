import type { RefObject, ReactNode } from 'react';
import type { PaletteCode } from '~web/themes';

export { PaletteCode };
export type LanguageCode = (typeof __WEBPACK_DEFINE__.I18N)['locales'][number];

export type SetterFns = {
  setLanguage: (language: LanguageCode) => void;
  setPalette: (palette: PaletteCode) => void;
};

export interface AppSettingsContextValue {
  readonly language: LanguageCode;
  readonly palette: PaletteCode;
  readonly languages: LanguageCode[];
  readonly palettes: PaletteCode[];

  setterRef: RefObject<SetterFns | undefined>;
}

export interface AppProviderManagerProps {
  children: ReactNode;
}
