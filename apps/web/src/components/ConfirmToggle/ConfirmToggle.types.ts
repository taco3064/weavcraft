import type { AlertProps } from '@mui/material/Alert';
import type { ForwardedRef, MouseEvent, ReactElement, ReactNode } from 'react';

export interface ConfirmToggleProps extends Pick<AlertProps, 'severity'> {
  message: ReactNode;
  subject?: ReactNode;
  toggle: ReactElement<{
    ref?: ForwardedRef<HTMLButtonElement>;
    onClick: (e: MouseEvent) => void;
  }>;
  onConfirm: () => void;
}
