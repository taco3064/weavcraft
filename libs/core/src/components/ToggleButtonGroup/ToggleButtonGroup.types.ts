import MuiToggleButton from '@mui/material/ToggleButton';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import type { ComponentProps } from 'react';
import type { JsonObject, Paths } from 'type-fest';

import type { IconCode } from '../Icon';
import type { PropsWithMappedData } from '../../hooks';
import type { SelectionGroupProps, SelectionVariant } from '../../hooks';

type MuiToggleButtonGroupProps = Pick<
  ComponentProps<typeof MuiToggleButtonGroup>,
  'color' | 'disabled' | 'fullWidth' | 'orientation' | 'size'
>;

type MuiToggleButtonProps = Pick<
  ComponentProps<typeof MuiToggleButton>,
  'color' | 'disabled'
>;

export type ToggleButtonProps<D extends JsonObject> = PropsWithMappedData<
  D,
  MuiToggleButtonProps & {
    icon?: IconCode;
    text?: string;
    value?: any;
  },
  'disabled' | 'icon' | 'text' | 'value'
>;

export interface ToggleButtonGroupProps<
  D extends JsonObject,
  V extends SelectionVariant,
  Path extends Extract<Paths<D>, string>
> extends MuiToggleButtonGroupProps,
    SelectionGroupProps<V, D, Path, ToggleButtonProps<D>> {
  variant?: V;
}
