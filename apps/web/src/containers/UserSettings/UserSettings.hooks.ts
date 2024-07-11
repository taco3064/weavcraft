import { useRouter } from 'next/router';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';

import { USER_SETTINGS } from './UserSettings.const';
import type { UserSettingId } from './UserSettings.types';

export function useExpanded(isAuthenticated: boolean) {
  const { pathname, asPath, replace } = useRouter();
  const [expanded, setExpanded] = useState<UserSettingId>();

  const updateHashRef = useRef((id: UserSettingId) =>
    replace(pathname, `${pathname}#${id}`)
  );

  useImperativeHandle(
    updateHashRef,
    () => (id: UserSettingId) => replace(pathname, `${pathname}#${id}`),
    [pathname, replace]
  );

  useEffect(() => {
    if (expanded) {
      updateHashRef.current(expanded);
    }
  }, [expanded]);

  useEffect(() => {
    const hashId = asPath.split('#')[1] as UserSettingId;

    const expanded = (USER_SETTINGS.find(
      ({ id, auth }) => id === hashId && (!auth || isAuthenticated)
    )?.id || 'settings') as UserSettingId;

    setExpanded(expanded);
  }, [isAuthenticated, asPath]);

  return [expanded, setExpanded] as const;
}
