import { useMemo } from 'react';

import { LayoutSourcesContext } from './LayoutSources.hooks';
import type { LayoutSourcesProviderProps } from './LayoutSources.types';

export default function LayoutSourcesProvider({
  children,
  layouts,
}: LayoutSourcesProviderProps) {
  return (
    <LayoutSourcesContext.Provider value={layouts}>
      {children}
    </LayoutSourcesContext.Provider>
  );
}
