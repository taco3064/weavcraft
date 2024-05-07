import MuiDialog from '@mui/material/Dialog';
import type { ButtonProps } from '@mui/material/Button';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import type { JsonObject } from 'type-fest';

import type { IconCode } from '../Icon';
import type { PropsWithMappedData, SlotProps } from '../../hooks';

type MuiDialogProps = Pick<
  ComponentProps<typeof MuiDialog>,
  'fullScreen' | 'maxWidth' | 'scroll'
>;

export type DialogProps<D extends JsonObject> = PropsWithMappedData<
  D,
  MuiDialogProps & {
    children?: ReactNode;
    icon?: IconCode;
    title?: string;
    toggle?: ReactElement<SlotProps>;
    onActionClick?: (key: string | number) => void;

    actions?: {
      text?: string;
      icon?: IconCode;
      color?: ButtonProps['color'];
    }[];
  },
  'children' | 'icon' | 'title'
>;
