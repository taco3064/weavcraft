import type Core from '@weavcraft/core';
import type { Awaitable } from 'next-auth';
import type { DialogProps } from '@mui/material/Dialog';
import type { ReactNode } from 'react';

import type { MenuItemOptions } from '../imports.types';

export interface SubProps
  extends Pick<MenuDialogProps, 'items' | 'title' | 'subtitle'> {
  icon?: Core.IconCode;
}

export interface MenuDialogProps
  extends Pick<DialogProps, 'TransitionComponent'> {
  indicator?: ReactNode;
  isLoading?: boolean;
  items: (null | false | undefined | MenuItemOptions)[];
  open: boolean;
  subMenu?: boolean;
  subtitle?: string;
  title?: string;
  onClose: () => void;
  onItemClick?: (e: string, index: number) => Awaitable<void | SubProps>;
}
