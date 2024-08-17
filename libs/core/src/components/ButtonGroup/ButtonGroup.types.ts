import MuiButtonGroup from '@mui/material/ButtonGroup';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { ButtonProps } from '../Button';
import type { PropsWithMappedStore } from '../../hooks';

type MuiButtonGroupProps = Pick<
  ComponentProps<typeof MuiButtonGroup>,
  'color' | 'disabled' | 'fullWidth' | 'orientation' | 'size' | 'variant'
>;

export type ButtonGroupProps<D extends JsonObject> = PropsWithMappedStore<
  D,
  MuiButtonGroupProps & {
    borderRadiusVariant?: 'top' | 'bottom' | 'none';
    itemProps?: Omit<ButtonProps<D>, 'data' | 'onClick'>;
    onItemClick?: (item: D) => void;
  },
  'disabled'
>;
