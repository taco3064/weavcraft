import MuiToggleButton from '@mui/material/ToggleButton';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import type { ComponentProps } from 'react';
import type { JsonObject, Paths } from 'type-fest';

import type { IconCode } from '../Icon';
import type { PropsWithMappedData } from '../../contexts';
import type { SelectionGroupProps, SelectionVariant } from '../../hooks';

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

export type ToggleButtonProps<D extends JsonObject> = PropsWithMappedData<
  D,
  BaseToggleButtonProps,
  keyof Pick<BaseToggleButtonProps, 'disabled' | 'icon' | 'text' | 'value'>
>;

export interface ToggleButtonGroupProps<
  D extends JsonObject,
  V extends SelectionVariant,
  Path extends Extract<Paths<D>, string>
> extends MuiToggleButtonGroupProps,
    SelectionGroupProps<V, D, Path, ToggleButtonProps<D>> {
  variant?: V;
}
