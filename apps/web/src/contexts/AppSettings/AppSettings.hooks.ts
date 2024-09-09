import * as React from 'react';
import Cookies from 'js-cookie';
import createEmotionCache from '@emotion/cache';
import _camelCase from 'lodash/camelCase';
import { createTheme, type Palette } from '@mui/material/styles';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { PALETTES, components } from '~web/themes';
import type { Credentials, PaletteCode } from '../imports.types';

import type {
  AppSettingsContextValue,
  CredentialKeys,
  LanguageCode,
} from './AppSettings.types';

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

export function useLanguage() {
  const { locale, locales, pathname, asPath, query, replace } = useRouter();

  return {
    language: locale || process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE,
    languages: locales as LanguageCode[],

    setLanguage: (language: LanguageCode) => {
      Cookies.set('language', language);

      replace({ pathname, query }, asPath, {
        locale: language,
        shallow: false,
      });
    },
  };
}

export function usePalette() {
  const [palette, setPalette] = React.useState<Palette | PaletteCode>(
    (Cookies.get('palette') || DEFAULT_THEME) as PaletteCode
  );

  const { cache, theme } = React.useMemo(
    () => ({
      cache: createEmotionCache({
        key: 'weavcraft',
      }),
      theme: createTheme({
        components,
        palette: typeof palette === 'string' ? PALETTES[palette] : palette,
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

    setPalette: React.useCallback((palette: PaletteCode | Palette) => {
      if (typeof palette === 'string') {
        Cookies.set('palette', palette);
      }

      setPalette(palette);
    }, []),
  };
}

export function useContextInit({
  isTutorialMode,
  language,
  languages,
  palette,
  palettes,
  setLanguage,
  setPalette,
}: AppSettingsContextValue) {
  const { status } = useSession();
  const { asPath } = useRouter();

  //* This credentials is only generated in client-side
  const credentials = useCredentials(asPath, status === 'unauthenticated');

  React.useEffect(() => {
    if (status === 'unauthenticated' && credentials) {
      signIn('credentials', { ...credentials, redirect: true });
    }
  }, [credentials, status]);

  return [
    status === 'loading' || Boolean(credentials),
    React.useMemo(
      () => ({
        isTutorialMode,
        language,
        languages,
        palette,
        palettes,
        setLanguage,
        setPalette,
      }),
      [
        isTutorialMode,
        language,
        languages,
        palette,
        palettes,
        setLanguage,
        setPalette,
      ]
    ),
  ] as const;
}

const CREDENTIALS_KEYS: CredentialKeys[] = [
  'accessToken',
  'providerToken',
  'refreshToken',
  'tokenType',
];

function useCredentials(asPath: string, isUnauthenticated: boolean) {
  return React.useMemo(() => {
    const hash = asPath.split('#')[1];
    const validKeys = Object.values(CREDENTIALS_KEYS).flat();

    const params = Object.fromEntries(
      Array.from(new URLSearchParams(hash).entries()).map(([key, value]) => [
        _camelCase(key) as keyof Credentials,
        value,
      ])
    );

    return !isUnauthenticated || validKeys.some((key) => !(key in params))
      ? undefined
      : Object.entries(params).reduce((acc, [key, value]) => {
          const fieldName = _camelCase(key) as CredentialKeys;

          return !CREDENTIALS_KEYS.includes(fieldName)
            ? acc
            : { ...acc, [fieldName]: value };
        }, {} as Credentials);
  }, [asPath, isUnauthenticated]);
}
