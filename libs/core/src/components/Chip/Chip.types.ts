import MuiChip from '@mui/material/Chip';
import type { ComponentProps, ReactElement } from 'react';

import type { GenerateDataWrappedProps, GenericData } from '../../contexts';

type MuiChipProps = Pick<
  ComponentProps<typeof MuiChip>,
  'color' | 'disabled' | 'label' | 'size' | 'variant' | 'onDelete'
>;

export interface ChipProps extends Omit<MuiChipProps, 'onDelete'> {
  indicator?: ReactElement;
  onClick?: <D extends GenericData>(data?: D) => void;
  onDelete?: <D extends GenericData>(data?: D) => void;
}

export type MappablePropNames = keyof Pick<ChipProps, 'disabled' | 'label'>;

export type WrappedProps<D extends GenericData> = GenerateDataWrappedProps<
  D,
  ChipProps,
  MappablePropNames
>;
