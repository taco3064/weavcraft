import * as React from 'react';

import type { TogglePortalContextValue } from './TogglePortal.types';

export const TogglePortalContext =
  React.createContext<TogglePortalContextValue>({
    open: false,
  });

export function useTogglePortal(onClose?: () => void) {
  const closeRef = React.useRef(onClose);

  const { containerEl, open, toggleRef } =
    React.useContext(TogglePortalContext);

  React.useImperativeHandle(closeRef, () => onClose, [onClose]);

  React.useEffect(() => {
    if (!open) {
      closeRef.current?.();
    }
  }, [open]);

  return {
    containerEl: open ? containerEl : undefined,
    onToggle: (open: boolean) => toggleRef?.current?.(open),
  };
}
