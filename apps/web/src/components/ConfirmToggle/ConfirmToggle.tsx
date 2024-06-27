import { isValidElement, cloneElement, useState, type MouseEvent } from 'react';

import ConfirmDialog from '../ConfirmDialog';
import type { ConfirmToggleProps, ToggleProps } from './ConfirmToggle.types';

export default function ConfirmToggle<T extends string>({
  triggerBy = 'onClick' as T,
  toggle,
  ...props
}: ConfirmToggleProps<T>) {
  const [open, setOpen] = useState(false);

  return !isValidElement(toggle) ? null : (
    <>
      <ConfirmDialog {...props} open={open} onClose={() => setOpen(false)} />

      {cloneElement(toggle, {
        [triggerBy]: (e: MouseEvent) => {
          e.stopPropagation();
          e.preventDefault();

          setOpen(true);
        },
      } as ToggleProps<T>)}
    </>
  );
}
