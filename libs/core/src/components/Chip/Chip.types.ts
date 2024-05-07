import MuiChip from '@mui/material/Chip';
import type { ComponentProps, ReactElement } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../hooks';

type MuiChipProps = Pick<
  ComponentProps<typeof MuiChip>,
  'color' | 'disabled' | 'label' | 'size' | 'variant' | 'onDelete'
>;

export type ChipProps<D extends JsonObject> = PropsWithMappedData<
  D,
  Omit<MuiChipProps, 'onDelete'> & {
    indicator?: ReactElement;
    onClick?: (data?: D) => void;
    onDelete?: (data?: D) => void;
  },
  'disabled' | 'label'
>;
