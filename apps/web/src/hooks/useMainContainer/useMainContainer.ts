import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useMemo, useState } from 'react';

import type { Margin } from './useMainContainer.types';

export function useMainMargin() {
  const [margin, setMargin] = useState<Margin>({ left: 0, right: 0 });
  const notSmall = useMediaQuery('(min-width:900px)');

  const observer = useMemo(
    () =>
      new MutationObserver((entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLDivElement;

          setMargin(getMargin(el, notSmall));
        }
      }),
    [notSmall]
  );

  useEffect(() => {
    const el = global.document
      ?.getElementById('__next')
      ?.querySelector('& > div[role="main"]') as HTMLDivElement;

    if (el) {
      setMargin(getMargin(el, notSmall));
      observer.observe(el, { attributeFilter: ['class'] });

      return () => observer.disconnect();
    }
  }, [notSmall, observer]);

  return margin;
}

function getMargin(el: HTMLDivElement, notSmall: boolean): Margin {
  if (notSmall && el.classList.contains('nav')) {
    return { left: process.env.NEXT_PUBLIC_XS_WIDTH, right: 0 };
  } else if (notSmall && el.classList.contains('custom')) {
    return { left: 0, right: process.env.NEXT_PUBLIC_XS_WIDTH };
  }

  return { left: 0, right: 0 };
}
