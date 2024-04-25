import Cookies from 'js-cookie';
import createEmotionCache from '@emotion/cache';
import { createTheme } from '@mui/material/styles';

import {
  createContext,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { PALETTES, components, type PaletteCode } from '~web/themes';
import type { ThemePalette } from '~web/services';

import type {
  AppSettingsContextValue,
  SetterFns,
} from './AppProviderManager.types';

const { NEXT_PUBLIC_DEFAULT_LANGUAGE } = process.env;

//* Custom Hooks
export const AppSettingsContext = createContext<AppSettingsContextValue>({
  isTutorialMode: false,
  language: NEXT_PUBLIC_DEFAULT_LANGUAGE,
  languages: [NEXT_PUBLIC_DEFAULT_LANGUAGE],
  palette: 'WEAVCRAFT',
  palettes: Object.keys(PALETTES) as PaletteCode[],
  setterRef: createRef<SetterFns>(),
});

export function useTutorialMode() {
  const { isTutorialMode } = useContext(AppSettingsContext);

  return isTutorialMode;
}

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

export function usePalettePreview() {
  const { palette, setPalette } = useAppSettings();
  const resetRef = useRef(() => setPalette?.(palette as PaletteCode));

  useEffect(() => resetRef.current, [resetRef]);

  return {
    isPreviewMode: typeof palette !== 'string',

    onPaletteApply: (palette?: Partial<ThemePalette>) => {
      if (palette) {
        setPalette?.(palette as ThemePalette);
      } else {
        resetRef.current();
      }
    },
  };
}

export function usePalette() {
  const [palette, setPalette] = useState<string | ThemePalette>(
    Cookies.get('palette') || 'WEAVCRAFT'
  );

  const { cache, theme } = useMemo(
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
    theme,

    setPalette: useCallback((palette: string | ThemePalette) => {
      if (typeof palette === 'string') {
        Cookies.set('palette', palette);
      }

      setPalette(palette);
    }, []),
  };
}
