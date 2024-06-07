import type { AlertProps } from '@mui/material/Alert';
import type { MouseEvent, ReactElement, ReactNode } from 'react';

export type ToggleProps<T extends string> = {
  [K in T]: (e: MouseEvent) => void;
};

export interface ConfirmToggleProps<T extends string>
  extends Pick<AlertProps, 'severity'> {
  message: ReactNode;
  subject?: ReactNode;
  triggerBy?: T;
  toggle: ReactElement<ToggleProps<T>>;
  onConfirm: () => void;
}
