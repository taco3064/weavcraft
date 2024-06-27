import Core from '@weavcraft/core';
import type { Breakpoint } from '@mui/material/styles';
import type { DialogProps } from '@mui/material/Dialog';
import type { ReactNode } from 'react';

export interface EditorDialogProps
  extends Pick<DialogProps, 'TransitionComponent'> {
  children: ReactNode;
  icon?: Core.IconCode;
  maxWidth?: Breakpoint;
  open: boolean;
  title?: string;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}
