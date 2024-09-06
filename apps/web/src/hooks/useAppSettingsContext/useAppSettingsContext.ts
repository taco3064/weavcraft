import _get from 'lodash/get';
import { signOut, useSession } from 'next-auth/react';
import { useContext } from 'react';
import type { UserData } from '@weavcraft/common';

import { Context } from '~web/contexts';

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    isAuth: status === 'authenticated',
    userinfo: _get(session, ['user']) as UserData | undefined,
    onSignout: () => signOut({ callbackUrl: '/', redirect: true }),
  };
}

export function useTutorialMode() {
  const { isTutorialMode } = useContext(Context.AppSettings);

  return isTutorialMode;
}

export function useAppSettings() {
  const { language, languages, palette, palettes, setLanguage, setPalette } =
    useContext(Context.AppSettings);

  return {
    language,
    languages,
    palette,
    palettes,
    setLanguage,
    setPalette,
  };
}
