import MuiDialog from '@mui/material/Dialog';
import type { ButtonProps } from '@mui/material/Button';
import type { ComponentProps, ReactElement, ReactNode } from 'react';

import type { IconCode } from '../Icon';

import type {
  GenerateDataWrappedProps,
  GenericData,
  SlotProps,
} from '../../contexts';

type MuiDialogProps = Pick<
  ComponentProps<typeof MuiDialog>,
  'fullScreen' | 'maxWidth' | 'scroll'
>;

export interface DialogProps extends MuiDialogProps {
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
}

export type MappablePropNames = keyof Pick<
  DialogProps,
  'children' | 'icon' | 'title'
>;

export type WrappedProps<D extends GenericData> = GenerateDataWrappedProps<
  D,
  DialogProps,
  MappablePropNames
>;
