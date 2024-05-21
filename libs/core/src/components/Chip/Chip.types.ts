import MuiChip from '@mui/material/Chip';
import type { ComponentProps, ReactElement } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../hooks';

type MuiChipProps = Pick<
  ComponentProps<typeof MuiChip>,
  'color' | 'disabled' | 'size' | 'variant' | 'onDelete'
>;

export type ChipProps<D extends JsonObject> = PropsWithMappedData<
  D,
  Omit<MuiChipProps, 'onDelete'> & {
    indicator?: ReactElement;
    label?: string | number;
    onClick?: (data?: D) => void;
    onDelete?: (data?: D) => void;
  },
  'disabled' | 'label'
>;
