import MuiToggleButton from '@mui/material/ToggleButton';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import type { ComponentProps } from 'react';

import type { SelectionGroupProps, SelectionVariant } from '../../hooks';
import type { GenericData, PropsWithMappedData } from '../../contexts';
import type { IconCode } from '../Icon';

type MuiToggleButtonGroupProps = Pick<
  ComponentProps<typeof MuiToggleButtonGroup>,
  'color' | 'disabled' | 'fullWidth' | 'orientation' | 'size'
>;

type MuiToggleButtonProps = Pick<
  ComponentProps<typeof MuiToggleButton>,
  'color' | 'disabled'
>;

interface BaseToggleButtonProps extends MuiToggleButtonProps {
  icon?: IconCode;
  text?: string;
  value?: any;
}

export type ToggleButtonProps<D extends GenericData> = PropsWithMappedData<
  D,
  BaseToggleButtonProps,
  keyof Pick<BaseToggleButtonProps, 'disabled' | 'icon' | 'text' | 'value'>
>;

export interface ToggleButtonGroupProps<
  D extends GenericData = {},
  V extends SelectionVariant = SelectionVariant
> extends MuiToggleButtonGroupProps,
    SelectionGroupProps<V, D, ToggleButtonProps<D>> {
  variant?: V;
}
