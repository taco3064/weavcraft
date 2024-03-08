import MuiDialog from '@mui/material/Dialog';
import type { ButtonProps } from '@mui/material/Button';
import type { ComponentProps, ReactElement, ReactNode } from 'react';

import type { BaseSlotProps } from '../../types';
import type { IconProps } from '../Icon';

type MuiDialogProps = Pick<
  ComponentProps<typeof MuiDialog>,
  'fullScreen' | 'maxWidth' | 'scroll'
>;

export interface DialogProps extends MuiDialogProps {
  children?: ReactNode;
  icon?: IconProps<never>['code'];
  title?: string;
  toggle?: ReactElement<BaseSlotProps>;
  onActionClick?: (key: string | number) => void;

  actions?: {
    text?: string;
    icon?: IconProps<never>['code'];
    color?: ButtonProps['color'];
  }[];
}
