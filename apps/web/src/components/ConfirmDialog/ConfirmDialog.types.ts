import type { AlertProps } from '@mui/material/Alert';
import type { DialogProps } from '@mui/material/Dialog';
import type { ReactNode } from 'react';

export interface ConfirmDialogProps
  extends Pick<AlertProps, 'severity'>,
    Pick<DialogProps, 'TransitionComponent'> {
  message: ReactNode;
  open: boolean;
  subject?: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}
