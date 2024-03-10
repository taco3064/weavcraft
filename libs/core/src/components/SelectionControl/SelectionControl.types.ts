import MuiCheckbox from '@mui/material/Checkbox';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import MuiRadio from '@mui/material/Radio';
import type { ComponentProps } from 'react';

import type { GenerateDataWrappedProps, GenericData } from '../../contexts';

export type Variant = 'checkbox' | 'radio';

type MuiSelectionControlProps = Pick<
  ComponentProps<typeof MuiCheckbox> & ComponentProps<typeof MuiRadio>,
  'checked' | 'color' | 'name' | 'size'
>;

type MuiFormControlLabelProps = Pick<
  ComponentProps<typeof MuiFormControlLabel>,
  'disabled' | 'label' | 'labelPlacement' | 'required' | 'value'
>;

type BaseSelectionControlProps = Partial<
  MuiSelectionControlProps & MuiFormControlLabelProps
>;

export type MappablePropNames = keyof Omit<
  BaseSelectionControlProps,
  'labelPlacement'
>;

export interface SelectionControlProps<V extends Variant>
  extends BaseSelectionControlProps {
  variant?: V;
  onChange?: (checked: boolean, data?: GenericData) => void;
}

export type WrappedProps<
  V extends Variant,
  D extends GenericData
> = GenerateDataWrappedProps<D, SelectionControlProps<V>, MappablePropNames>;
