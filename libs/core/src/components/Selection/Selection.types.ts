import MuiCheckbox from '@mui/material/Checkbox';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import MuiRadio from '@mui/material/Radio';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../hooks';

export type SelectionVariant = 'checkbox' | 'radio';

type MuiFormControlLabelProps = Pick<
  ComponentProps<typeof MuiFormControlLabel>,
  'disabled' | 'label' | 'labelPlacement' | 'required' | 'value'
>;

type BaseControlLabelProps = Partial<
  MuiFormControlLabelProps &
    Pick<
      ComponentProps<typeof MuiCheckbox> & ComponentProps<typeof MuiRadio>,
      'checked' | 'color' | 'name' | 'size'
    >
>;

export type SelectionProps<
  D extends JsonObject,
  V extends SelectionVariant
> = PropsWithMappedData<
  D,
  BaseControlLabelProps & {
    variant?: V;
    onChange?: (checked: boolean, data?: D) => void;
  },
  'checked' | 'disabled' | 'label' | 'required' | 'value' | 'name'
>;
