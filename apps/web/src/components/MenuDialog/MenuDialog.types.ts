import type { DialogProps } from '@mui/material/Dialog';
import type { ReactElement, ReactNode } from 'react';
import type { TransitionProps } from '@mui/material/transitions';

export type MenuItemOptions<P = {}> = P &
  (
    | 'divider'
    | {
        href?: string;
        indicator?: ReactNode;
        label: string;
        items?: (null | false | undefined | MenuItemOptions<P>)[];
      }
  );

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
  onItemClick?: (e: string) => void;
}