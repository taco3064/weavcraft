import MuiChip from '@mui/material/Chip';
import type { ComponentProps, ReactElement } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../contexts';

type MuiChipProps = Pick<
  ComponentProps<typeof MuiChip>,
  'color' | 'disabled' | 'label' | 'size' | 'variant' | 'onDelete'
>;

export interface ChipProps<D extends JsonObject>
  extends Omit<MuiChipProps, 'onDelete'> {
  indicator?: ReactElement;
  onClick?: (data?: D) => void;
  onDelete?: (data?: D) => void;
}

export type MappablePropNames = keyof Pick<ChipProps<{}>, 'disabled' | 'label'>;

export type WrappedProps<D extends JsonObject> = PropsWithMappedData<
  D,
  ChipProps<D>,
  MappablePropNames
>;
