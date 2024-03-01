import MuiFormControlLabel from '@mui/material/FormControlLabel';
import MuiSwitch from '@mui/material/Switch';
import type { ComponentProps, ElementType } from 'react';

import type { BaseFieldProps } from '../BaseField';

type MuiSwitchProps = Pick<ComponentProps<typeof MuiSwitch>, 'color' | 'size'>;

type MuiFormControlLabelProps = Omit<
  ComponentProps<typeof MuiFormControlLabel>,
  'control' | 'inputRef' | 'labelPlacement' | 'style'
>;

export type SwitchInputProps = MuiSwitchProps & MuiFormControlLabelProps;

export type SwitchFieldProps = BaseFieldProps<
  boolean,
  ElementType<SwitchInputProps>
>;
