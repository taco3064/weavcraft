import * as React from 'react';
import Cookies from 'js-cookie';
import createEmotionCache from '@emotion/cache';
import { createTheme, type Palette } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { PALETTES, components } from '~web/themes';
import type { PaletteCode } from '../imports.types';

import type {
  AppSettingsContextValue,
  LanguageCode,
} from './AppProviderManager.types';

const DEFAULT_THEME: PaletteCode = 'WEAVCRAFT';
const { NEXT_PUBLIC_DEFAULT_LANGUAGE } = process.env;

export const AppSettingsContext = React.createContext<AppSettingsContextValue>({
  isTutorialMode: false,
  language: NEXT_PUBLIC_DEFAULT_LANGUAGE,
  languages: [NEXT_PUBLIC_DEFAULT_LANGUAGE],
  palette: DEFAULT_THEME,
  palettes: Object.keys(PALETTES) as PaletteCode[],
  setLanguage: () => null,
  setPalette: () => null,
});

export function useAuthState() {
  const { token } = React.useContext(AppSettingsContext);

  return {
    isAuth: Boolean(token),
    token: token,
  };
}

export function useTutorialMode() {
  const { isTutorialMode } = React.useContext(AppSettingsContext);

  return isTutorialMode;
}

export function useAppSettings() {
  const { language, languages, palette, palettes, setLanguage, setPalette } =
    React.useContext(AppSettingsContext);

  return {
    language,
    languages,
    palette,
    palettes,
    setLanguage,
    setPalette,
  };
}

export function useLanguage(defaultLanguage: LanguageCode) {
  const [language, setLanguage] = React.useState(defaultLanguage);

  const { i18n } = useTranslation();
  const { locales } = useRouter();

  return {
    language,
    languages: locales as LanguageCode[],

    setLanguage: (language: LanguageCode) =>
      i18n.changeLanguage(language, () => {
        Cookies.set('language', language);
        setLanguage(language);
      }),
  };
}

export function usePalette(defaultPalette: string = DEFAULT_THEME) {
  const [palette, setPalette] = React.useState<string | Palette>(
    defaultPalette
  );

  const { cache, theme } = React.useMemo(
    () => ({
      cache: createEmotionCache({
        key: 'weavcraft',
      }),
      theme: createTheme({
        components,
        palette:
          typeof palette === 'string'
            ? PALETTES[palette as PaletteCode]
            : palette,
        typography: {
          fontFamily: '"Verdana", "微軟雅黑"',
        },
      }),
    }),
    [palette]
  );

  return {
    cache,
    palette,
    palettes: Object.keys(PALETTES) as PaletteCode[],
    theme,

    setPalette: React.useCallback((palette: string | Palette) => {
      if (typeof palette === 'string') {
        Cookies.set('palette', palette);
      }

      setPalette(palette);
    }, []),
  };
}
