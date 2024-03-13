import MuiToggleButton from '@mui/material/ToggleButton';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import type { ComponentProps } from 'react';

import type { GenericData, MappableProps } from '../../contexts';
import type { ControlVariant, GroupProps } from '../../hooks';

type MuiToggleButtonGroupProps = Pick<
  ComponentProps<typeof MuiToggleButtonGroup>,
  'color' | 'disabled' | 'fullWidth' | 'orientation' | 'size'
>;

type MuiToggleButtonProps = Pick<
  ComponentProps<typeof MuiToggleButton>,
  'color' | 'disabled'
>;

export type ToggleButtonGroupProps<
  D extends GenericData,
  T extends ControlVariant
> = MuiToggleButtonGroupProps &
  GroupProps<T, MuiToggleButtonProps & MappableProps<D>>;
