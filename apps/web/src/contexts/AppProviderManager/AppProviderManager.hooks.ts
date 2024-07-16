import * as React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import createEmotionCache from '@emotion/cache';
import _camelCase from 'lodash/camelCase';
import _set from 'lodash/set';
import { createTheme, type Palette } from '@mui/material/styles';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'next-i18next';

import { PALETTES, components } from '~web/themes';
import { doSingOut, getAccessToken } from '~web/services';
import type { PaletteCode, SigninInfo } from '../imports.types';

import type {
  AppSettingsContextValue,
  AuthInfo,
  SetterFns,
} from './AppProviderManager.types';

let REQ_OVERRIDE_ID: number;
const DEFAULT_THEME: PaletteCode = 'WEAVCRAFT';
const { NEXT_PUBLIC_DEFAULT_LANGUAGE } = process.env;

const AUTH_INFO_KEYS = [
  'accessToken',
  'providerToken',
  'refreshToken',
  'tokenType',
] as (keyof SigninInfo)[];

export const AppSettingsContext = React.createContext<AppSettingsContextValue>({
  isTutorialMode: false,
  language: NEXT_PUBLIC_DEFAULT_LANGUAGE,
  languages: [NEXT_PUBLIC_DEFAULT_LANGUAGE],
  palette: DEFAULT_THEME,
  palettes: Object.keys(PALETTES) as PaletteCode[],
  setterRef: React.createRef<SetterFns>(),
});

export function useTutorialMode() {
  const { isTutorialMode } = React.useContext(AppSettingsContext);

  return isTutorialMode;
}

export function useAppSettings() {
  const { language, languages, palette, palettes, setterRef } =
    React.useContext(AppSettingsContext);

  return {
    language,
    languages,
    palette,
    palettes,
    setLanguage: setterRef.current?.setLanguage,
    setPalette: setterRef.current?.setPalette,
  };
}

export function useAuth() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { token } = React.useContext(AppSettingsContext);
  const { asPath, pathname, query, replace } = useRouter();
  const [path, hash] = asPath.split('#');

  const authRef = React.useRef<(token: string) => void>();
  const signinInfo = useSigninInfo(hash);

  const { data: { accessToken = token } = {}, ...tokenState } = useQuery({
    enabled: Boolean(signinInfo),
    queryKey: [signinInfo as AuthInfo],
    queryFn: getAccessToken,
  });

  const { mutate: onSignout, ...signoutState } = useMutation({
    mutationFn: doSingOut,
    onError: (err) => enqueueSnackbar(err.message, { variant: 'error' }),
    onSuccess: () => {
      Cookies.remove('token');
      axios.interceptors.request.eject(REQ_OVERRIDE_ID);
      global.location?.reload();

      enqueueSnackbar(t('msg-success-signout'), {
        variant: 'success',
      });
    },
  });

  React.useImperativeHandle(
    authRef,
    () => (token) => {
      REQ_OVERRIDE_ID = axios.interceptors.request.use((config) =>
        _set(config, ['headers', 'Authorization'], token)
      );

      Cookies.set('token', token);
      replace({ pathname, query }, path, { shallow: false });
    },
    [pathname, query, path, replace]
  );

  React.useEffect(() => {
    if (accessToken) {
      authRef.current?.(accessToken);
    }
  }, [accessToken]);

  return {
    isAuthenticated: Boolean(accessToken),
    isLoading: tokenState.isLoading || signoutState.isPending,
    onSignout,
  };
}

export function usePalette() {
  const [palette, setPalette] = React.useState<string | Palette>(
    Cookies.get('palette') || DEFAULT_THEME
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
    theme,

    setPalette: React.useCallback((palette: string | Palette) => {
      if (typeof palette === 'string') {
        Cookies.set('palette', palette);
      }

      setPalette(palette);
    }, []),
  };
}

function useSigninInfo(hash: string) {
  return React.useMemo(() => {
    const validKeys = Object.values(AUTH_INFO_KEYS).flat();

    const params = Object.fromEntries(
      Array.from(new URLSearchParams(hash).entries()).map(([key, value]) => [
        _camelCase(key) as keyof AuthInfo,
        value,
      ])
    );

    return validKeys.some((key) => !(key in params))
      ? undefined
      : Object.entries(params).reduce((acc, [key, value]) => {
          const fieldName = _camelCase(key) as keyof SigninInfo;

          return !AUTH_INFO_KEYS.includes(fieldName)
            ? acc
            : { ...acc, [fieldName]: value };
        }, {} as AuthInfo);
  }, [hash]);
}
