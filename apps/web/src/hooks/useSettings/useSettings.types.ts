import type { PaletteCode } from '~web/themes';

export { type PaletteCode };
export type LanguageCode = (typeof __WEBPACK_DEFINE__.I18N.locales)[number];

export interface SettingsState {
  language: LanguageCode;
  palette: PaletteCode;

  setLanguage: (language: LanguageCode) => void;
  setPalette: (palette: PaletteCode) => void;
}
