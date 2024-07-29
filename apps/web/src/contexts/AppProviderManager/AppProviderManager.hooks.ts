import * as React from 'react';
import Cookies from 'js-cookie';
import createEmotionCache from '@emotion/cache';
import { createTheme, type Palette } from '@mui/material/styles';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'next-i18next';

import { PALETTES, components } from '~web/themes';
import type { PaletteCode } from '../imports.types';

import {
  doSingOut,
  getRefreshToken,
  refreshTokens,
  setAuthInterceptor,
} from '~web/services';

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

export function useAuth() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const { accessToken, refreshToken, userinfo } =
    React.useContext(AppSettingsContext);

  const { mutate: onSignout } = useMutation({
    mutationFn: doSingOut,
    onError: (err) => enqueueSnackbar(err.message, { variant: 'error' }),
    onSuccess: () => {
      Cookies.remove('refreshToken');
      global.location?.reload();
      enqueueSnackbar(t('msg-success-signout'), { variant: 'success' });
    },
  });

  return {
    isAuth: Boolean(accessToken),
    accessToken,
    refreshToken,
    userinfo,
    onSignout: () => refreshToken && onSignout(refreshToken),
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

export function useContextInit({
  accessToken,
  isTutorialMode,
  language,
  languages,
  palette,
  palettes,
  refreshToken,
  userinfo,
  setLanguage,
  setPalette,
}: AppSettingsContextValue) {
  const signinRef = React.useRef<void>();
  const { asPath } = useRouter();

  //* This query is only used in client-side
  const { data: newToken } = useSuspenseQuery({
    queryHash: 'auth-tokens',
    queryKey: [],
    queryFn: getRefreshToken,
  });

  React.useImperativeHandle(
    signinRef,
    () => {
      if (newToken && global.location?.hash) {
        Cookies.set('refreshToken', newToken);
        global.location?.replace(asPath.replace(/#.*$/, ''));
      }
    },
    [asPath, newToken]
  );

  React.useEffect(() => {
    if (accessToken && refreshToken) {
      setAuthInterceptor({
        accessToken,
        onError: global.location?.reload,
        onRefresh: async () => {
          const tokens = await refreshTokens(refreshToken);

          Object.entries(tokens).forEach(([key, value]) =>
            Cookies.set(key, value)
          );
        },
      });
    }

    return () => setAuthInterceptor(false);
  }, [accessToken, refreshToken]);

  return [
    Boolean(global.location?.hash),
    React.useMemo(
      () => ({
        accessToken,
        isTutorialMode,
        language,
        languages,
        palette,
        palettes,
        refreshToken,
        userinfo,
        setLanguage,
        setPalette,
      }),
      [
        accessToken,
        isTutorialMode,
        language,
        languages,
        palette,
        palettes,
        refreshToken,
        userinfo,
        setLanguage,
        setPalette,
      ]
    ),
  ] as const;
}
