import type { AlertProps } from '@mui/material/Alert';
import type { ForwardedRef, ReactElement, ReactNode } from 'react';

export interface ConfirmToggleProps extends Pick<AlertProps, 'severity'> {
  message: ReactNode;
  title?: ReactNode;
  toggle: ReactElement<{
    ref?: ForwardedRef<HTMLButtonElement>;
    onClick: () => void;
  }>;
  onConfirm: () => void;
}
