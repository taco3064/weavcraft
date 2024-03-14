import MuiButton from '@mui/material/Button';
import type { ComponentProps } from 'react';

import type { GenericData, PropsWithMappedData } from '../../contexts';
import type { IconCode } from '../Icon';

type MuiButtonProps = Pick<
  ComponentProps<typeof MuiButton>,
  'color' | 'disabled' | 'fullWidth' | 'href' | 'size' | 'variant' | 'onClick'
>;

export interface ButtonProps extends MuiButtonProps {
  icon?: IconCode;
  iconPosition?: 'start' | 'end';
  text?: string;
}

export type MappablePropNames = keyof Pick<
  ButtonProps,
  'disabled' | 'href' | 'icon' | 'text'
>;

export type WrappedProps<D extends GenericData> = PropsWithMappedData<
  D,
  ButtonProps,
  MappablePropNames
>;
