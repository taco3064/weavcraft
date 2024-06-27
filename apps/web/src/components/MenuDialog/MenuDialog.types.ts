import type { DialogProps } from '@mui/material/Dialog';
import type { ReactNode } from 'react';

import type { MenuItemOptions } from '../imports.types';

export interface MenuDialogProps
  extends Pick<DialogProps, 'TransitionComponent'> {
  indicator?: ReactNode;
  items: (null | false | undefined | MenuItemOptions)[];
  open: boolean;
  subtitle?: string;
  title?: string;
  onClose: () => void;
  onItemClick?: (e: string, index: number) => void;
}
