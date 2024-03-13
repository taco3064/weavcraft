import MuiDivider from '@mui/material/Divider';
import type { ComponentProps } from 'react';

import type { GenerateDataWrappedProps, GenericData } from '../../contexts';

type MuiDividerProps = Pick<
  ComponentProps<typeof MuiDivider>,
  'flexItem' | 'orientation' | 'variant'
>;

export interface DividerProps extends MuiDividerProps {
  text?: string;
}

export type MappablePropNames = keyof Pick<DividerProps, 'text'>;

export type WrappedProps<D extends GenericData> = GenerateDataWrappedProps<
  D,
  DividerProps,
  MappablePropNames
>;