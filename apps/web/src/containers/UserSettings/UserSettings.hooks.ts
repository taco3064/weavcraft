import { useRouter } from 'next/router';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';

import { ACCORDIONS } from './UserSettings.const';
import type { AccordionId } from './UserSettings.types';

export function useExpanded(isAuthenticated: boolean) {
  const { pathname, asPath, replace } = useRouter();
  const [expanded, setExpanded] = useState<AccordionId>();

  const updateHashRef = useRef((id: AccordionId) =>
    replace(pathname, `${pathname}#${id}`)
  );

  useImperativeHandle(
    updateHashRef,
    () => (id: AccordionId) => replace(pathname, `${pathname}#${id}`),
    [pathname, replace]
  );

  useEffect(() => {
    if (expanded) {
      updateHashRef.current(expanded);
    }
  }, [expanded]);

  useEffect(() => {
    const hashId = asPath.split('#')[1] as AccordionId;

    const expanded = (ACCORDIONS.find(
      ({ id, auth }) => id === hashId && (!auth || isAuthenticated)
    )?.id || 'settings') as AccordionId;

    setExpanded(expanded);
  }, [isAuthenticated, asPath]);

  return [expanded, setExpanded] as const;
}
