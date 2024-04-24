import { createContext, useContext } from 'react';
import type { TogglePortalContextValue } from './TogglePortal.types';

export const TogglePortalContext = createContext<TogglePortalContextValue>({
  open: false,
});

export function useTogglePortal() {
  const { containerEl, open, toggleRef } = useContext(TogglePortalContext);

  return {
    containerEl: open ? containerEl : undefined,
    onToggle: (open: boolean) => toggleRef?.current?.(open),
  };
}
