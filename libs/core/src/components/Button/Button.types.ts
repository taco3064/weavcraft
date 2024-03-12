import MuiButton from '@mui/material/Button';
import type { ComponentProps } from 'react';

import type { GenerateDataWrappedProps, GenericData } from '../../contexts';
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

export type WrappedProps<D extends GenericData> = GenerateDataWrappedProps<
  D,
  ButtonProps,
  MappablePropNames
>;
