import MuiCheckbox from '@mui/material/Checkbox';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import MuiRadio from '@mui/material/Radio';
import type { ComponentProps } from 'react';

import type { GenericData, MappableProps } from '../../types';

export type Variant = 'checkbox' | 'radio';

type MuiSelectionControlProps = Pick<
  ComponentProps<typeof MuiCheckbox> & ComponentProps<typeof MuiRadio>,
  'checked' | 'color' | 'name' | 'size'
>;

type MuiFormControlLabelProps = Pick<
  ComponentProps<typeof MuiFormControlLabel>,
  'disabled' | 'label' | 'labelPlacement' | 'required' | 'value'
>;

type BaseCheckboxProps = Omit<
  Partial<MuiSelectionControlProps & MuiFormControlLabelProps>,
  'checked' | 'labelPlacement'
>;

export interface SelectionControlProps<V extends Variant, D extends GenericData>
  extends MappableProps<D, BaseCheckboxProps> {
  variant?: V;
  checked?: MuiSelectionControlProps['checked'];
  onChange?: (checked: boolean, data?: D) => void;

  labelPlacement?: Extract<
    MuiFormControlLabelProps['labelPlacement'],
    'end' | 'start'
  >;
}
