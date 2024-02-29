import MuiCheckbox from '@mui/material/Checkbox';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import type { ComponentProps } from 'react';

import type { GenericData, MappableProps } from '../../types';

type MuiCheckboxProps = Pick<
  ComponentProps<typeof MuiCheckbox>,
  'color' | 'name' | 'size'
>;

type MuiFormControlLabelProps = Pick<
  ComponentProps<typeof MuiFormControlLabel>,
  'checked' | 'disabled' | 'label' | 'labelPlacement' | 'required' | 'value'
>;

type BaseCheckboxProps = Partial<
  MuiCheckboxProps & Omit<MuiFormControlLabelProps, 'labelPlacement'>
>;

export interface CheckboxProps<D extends GenericData>
  extends MappableProps<D, BaseCheckboxProps> {
  onChange?: (checked: boolean, data?: D) => void;

  labelPlacement?: Extract<
    MuiFormControlLabelProps['labelPlacement'],
    'end' | 'start'
  >;
}
