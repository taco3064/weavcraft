import type { MouseEvent, ReactElement, ReactNode } from 'react';
import type { ConfirmDialogProps } from '../ConfirmDialog';

export type ToggleProps<T extends string> = {
  [K in T]: (e: MouseEvent) => void;
};

export interface ConfirmToggleProps<T extends string>
  extends Pick<
    ConfirmDialogProps,
    'severity' | 'message' | 'onConfirm' | 'subject'
  > {
  triggerBy?: T;
  toggle: ReactElement<ToggleProps<T>>;
}
