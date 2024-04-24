import { useImperativeHandle, useMemo, useRef, useState } from 'react';

import { TogglePortalContext } from './TogglePortal.hooks';

import type {
  TogglePortalContextValue,
  TogglePortalProviderProps,
} from './TogglePortal.types';

export default function TogglePortalProvider({
  open,
  render,
  onToggle,
}: TogglePortalProviderProps) {
  const [containerEl, setContainerEl] = useState<HTMLElement>();
  const toggleRef = useRef(onToggle);

  const value = useMemo<TogglePortalContextValue>(
    () => ({
      containerEl,
      open,
      toggleRef,
    }),
    [containerEl, open]
  );

  useImperativeHandle(toggleRef, () => onToggle, [onToggle]);

  return (
    <TogglePortalContext.Provider value={value}>
      {render((el) => setContainerEl(el || undefined))}
    </TogglePortalContext.Provider>
  );
}
