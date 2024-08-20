import { useEffect, useMemo, useState } from 'react';
import _debounce from 'lodash/debounce';
import type { Margin } from './useMainContainer.types';

export function useMainMargin() {
  const [margin, setMargin] = useState<Margin>({ left: 0, right: 0 });

  console.log(margin);

  const observer = useMemo(
    () =>
      new MutationObserver(
        _debounce((entries) => {
          for (const entry of entries) {
            const el = entry.target as HTMLDivElement;
            const computedStyle = global.window?.getComputedStyle(el);

            setMargin({
              left: Number.parseFloat(computedStyle.marginLeft) || 0,
              right: Number.parseFloat(computedStyle.marginRight) || 0,
            });
          }
        }, 400)
      ),
    []
  );

  useEffect(() => {
    const el = global.document
      ?.getElementById('__next')
      ?.querySelector('& > div[role="main"]');

    if (el) {
      observer.observe(el, { attributeFilter: ['class'] });

      return () => observer.disconnect();
    }
  }, [observer]);

  return margin;
}
