import MuiCheckbox from '@mui/material/Checkbox';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import MuiRadio from '@mui/material/Radio';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../contexts';

export type SelectionVariant = 'checkbox' | 'radio';

type MuiFormControlLabelProps = Pick<
  ComponentProps<typeof MuiFormControlLabel>,
  'disabled' | 'label' | 'labelPlacement' | 'required' | 'value'
>;

type BaseSelectionProps = Partial<
  MuiFormControlLabelProps &
    Pick<
      ComponentProps<typeof MuiCheckbox> & ComponentProps<typeof MuiRadio>,
      'checked' | 'color' | 'name' | 'size'
    >
>;

export type MappablePropNames = keyof Omit<
  BaseSelectionProps,
  'color' | 'labelPlacement' | 'size'
>;

export interface SelectionProps<
  D extends JsonObject,
  V extends SelectionVariant = SelectionVariant
> extends BaseSelectionProps {
  variant?: V;
  onChange?: (checked: boolean, data?: D) => void;
}

export type WrappedProps<
  D extends JsonObject,
  V extends SelectionVariant
> = PropsWithMappedData<D, SelectionProps<D, V>, MappablePropNames>;
