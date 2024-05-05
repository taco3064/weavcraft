import MuiButtonGroup from '@mui/material/ButtonGroup';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { ButtonProps } from '../Button';
import type { PropsWithMappedStore } from '../../contexts';

type MuiButtonGroupProps = Pick<
  ComponentProps<typeof MuiButtonGroup>,
  'color' | 'disabled' | 'fullWidth' | 'orientation' | 'size' | 'variant'
>;

type MappablePropNames = keyof Pick<MuiButtonGroupProps, 'disabled'>;

export type ButtonGroupProps<D extends JsonObject> = PropsWithMappedStore<
  D,
  MuiButtonGroupProps & {
    borderRadiusVariant?: 'top' | 'bottom' | 'none';
    itemProps?: Pick<ButtonProps<D>, 'iconPosition' | 'propMapping'>;
    onItemClick?: (item: D) => void;
  },
  MappablePropNames
>;
