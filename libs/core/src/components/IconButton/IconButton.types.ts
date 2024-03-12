import MuiIconButton from '@mui/material/IconButton';
import type { ComponentProps } from 'react';

import type { GenerateDataWrappedProps, GenericData } from '../../contexts';
import type { IconCode } from '../Icon';

type MuiIconButtonProps = Pick<
  ComponentProps<typeof MuiIconButton>,
  'color' | 'disabled' | 'size'
>;

export interface IconButtonProps extends MuiIconButtonProps {
  href?: string;
  icon?: IconCode;
}

export type MappablePropNames = keyof Pick<
  IconButtonProps,
  'disabled' | 'href' | 'icon'
>;

export type WrappedProps<D extends GenericData> = GenerateDataWrappedProps<
  D,
  IconButtonProps,
  MappablePropNames
>;
