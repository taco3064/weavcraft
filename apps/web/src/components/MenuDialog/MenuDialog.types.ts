import type { DialogProps } from '@mui/material/Dialog';
import type { ReactElement, ReactNode } from 'react';
import type { TransitionProps } from '@mui/material/transitions';

import type { MenuItemOptions } from '~web/hooks';

export type SubTransitionProps = TransitionProps & {
  children: ReactElement;
};

export interface MenuDialogProps
  extends Pick<DialogProps, 'TransitionComponent'> {
  indicator?: ReactNode;
  items: (null | false | undefined | MenuItemOptions)[];
  open: boolean;
  title?: string;
  onClose: () => void;
  onItemClick?: (e: string, index: number) => void;
}
