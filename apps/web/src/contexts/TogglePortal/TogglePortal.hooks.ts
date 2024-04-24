import {
  createContext,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import type { TogglePortalContextValue } from './TogglePortal.types';

export const TogglePortalContext = createContext<TogglePortalContextValue>({
  open: false,
});

export function useTogglePortal(onClose?: () => void) {
  const closeRef = useRef(onClose);
  const { containerEl, open, toggleRef } = useContext(TogglePortalContext);

  useImperativeHandle(closeRef, () => onClose, [onClose]);

  useEffect(() => {
    if (!open) {
      closeRef.current?.();
    }
  }, [open]);

  return {
    containerEl: open ? containerEl : undefined,
    onToggle: (open: boolean) => toggleRef?.current?.(open),
  };
}
