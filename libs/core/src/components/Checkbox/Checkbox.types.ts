import MuiCheckbox from '@mui/material/Checkbox';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import type { ComponentProps } from 'react';

import type { GenericData, MappableProps } from '../../types';

type MuiCheckboxProps = Pick<
  ComponentProps<typeof MuiCheckbox>,
  'checked' | 'color' | 'name' | 'size'
>;

type MuiFormControlLabelProps = Pick<
  ComponentProps<typeof MuiFormControlLabel>,
  'disabled' | 'label' | 'labelPlacement' | 'required' | 'value'
>;

type BaseCheckboxProps = Omit<
  Partial<MuiCheckboxProps & MuiFormControlLabelProps>,
  'checked' | 'labelPlacement'
>;

export interface CheckboxProps<D extends GenericData>
  extends MappableProps<D, BaseCheckboxProps> {
  checked?: MuiCheckboxProps['checked'];
  onChange?: (checked: boolean, data?: D) => void;

  labelPlacement?: Extract<
    MuiFormControlLabelProps['labelPlacement'],
    'end' | 'start'
  >;
}
