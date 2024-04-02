import Cookies from 'js-cookie';
import createEmotionCache from '@emotion/cache';
import { createTheme } from '@mui/material/styles';

import {
  createContext,
  createRef,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { PALETTES, components, type PaletteCode } from '~web/themes';

import type {
  AppSettingsContextValue,
  SetterFns,
} from './AppProviderManager.types';

const { NEXT_PUBLIC_DEFAULT_LANGUAGE } = process.env;

//* Custom Hooks
export const AppSettingsContext = createContext<AppSettingsContextValue>({
  language: NEXT_PUBLIC_DEFAULT_LANGUAGE,
  languages: [NEXT_PUBLIC_DEFAULT_LANGUAGE],
  palette: 'WEAVCRAFT',
  palettes: Object.keys(PALETTES) as PaletteCode[],
  setterRef: createRef<SetterFns>(),
});

export function useAppSettings() {
  const { language, languages, palette, palettes, setterRef } =
    useContext(AppSettingsContext);

  return {
    language,
    languages,
    palette,
    palettes,
    setLanguage: setterRef.current?.setLanguage,
    setPalette: setterRef.current?.setPalette,
  };
}

export function usePalette() {
  const [palette, setPalette] = useState<string>(
    Cookies.get('palette') || 'WEAVCRAFT'
  );

  const { cache, theme } = useMemo(
    () => ({
      cache: createEmotionCache({
        key: palette.toLowerCase().replace(/_/g, '-'),
      }),
      theme: createTheme({
        components,
        palette:
          palette in PALETTES ? PALETTES[palette as PaletteCode] : undefined,
        typography: {
          fontFamily: '"Verdana", "微軟雅黑"',
        },
      }),
    }),
    [palette]
  );

  return [
    { cache, palette, theme },

    useCallback((palette: string) => {
      Cookies.set('palette', palette);
      setPalette(palette);
    }, []),
  ] as const;
}
