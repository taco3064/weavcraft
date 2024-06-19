import type { DialogProps } from '@mui/material/Dialog';
import type { ReactElement, ReactNode } from 'react';
import type { TransitionProps } from '@mui/material/transitions';

import type { MenuItemOptions } from '../imports.types';

export type SubTransitionProps = TransitionProps & {
  children: ReactElement;
};

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
