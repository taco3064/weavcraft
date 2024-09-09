import { useContext, useEffect, useImperativeHandle, useRef } from 'react';
import { Context } from '~web/contexts';

export function useTogglePortal(onClose?: () => void) {
  const closeRef = useRef(onClose);
  const { containerEl, open, toggleRef } = useContext(Context.TogglePortal);

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
