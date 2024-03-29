import Cookies from 'js-cookie';
import { create } from 'zustand';

import type { PaletteCode } from '~web/themes';
import type { LanguageCode, SettingsState } from './useSettings.types';

export const useSettings = create<SettingsState>((set) => ({
  language: (Cookies.get('language') ||
    __WEBPACK_DEFINE__.I18N.locales[0]) as LanguageCode,

  palette: (Cookies.get('palette') || 'WEAVCRAFT') as PaletteCode,

  setLanguage: (language) => {
    set({ language });
    Cookies.set('language', language);
  },
  setPalette: (palette) => {
    set({ palette });
    Cookies.set('palette', palette);
  },
}));
