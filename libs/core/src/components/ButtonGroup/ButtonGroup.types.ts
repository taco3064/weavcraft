import MuiButtonGroup from '@mui/material/ButtonGroup';
import type { ComponentProps } from 'react';

import type { ButtonProps } from '../Button';
import type { GenericData, PropsWithStore } from '../../contexts';

type MuiButtonGroupProps = Pick<
  ComponentProps<typeof MuiButtonGroup>,
  'color' | 'disabled' | 'fullWidth' | 'orientation' | 'size' | 'variant'
>;

export type MappablePropNames = keyof Pick<MuiButtonGroupProps, 'disabled'>;

export type ButtonGroupProps<D extends GenericData> = PropsWithStore<
  D,
  MuiButtonGroupProps & {
    borderRadiusVariant?: 'top' | 'bottom' | 'none';
    itemProps?: Pick<ButtonProps<D>, 'iconPosition' | 'propMapping'>;
    onItemClick?: (item: D) => void;
  },
  MappablePropNames
>;
