import MuiTextField from '@mui/material/TextField';
import type { ComponentProps, ElementType, ReactNode } from 'react';

type MuiTextFieldProps = Omit<
  ComponentProps<typeof MuiTextField>,
  'defaultValue' | 'value' | 'onChange'
>;

export type MuiInputProps = NonNullable<MuiTextFieldProps['InputProps']>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface BaseInputProps<C extends ElementType<any>>
  extends Omit<
    MuiInputProps,
    'inputComponent' | 'inputProps' | 'endAdornment' | 'startAdornment'
  > {
  inputComponent?: C;
  inputProps?: ComponentProps<C>;
}

export interface BaseFieldProps<
  V,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  C extends ElementType<any>
> extends Omit<MuiTextFieldProps, 'InputProps'> {
  InputProps?: BaseInputProps<C>;
  adornment?: ReactNode;
  adornmentPosition?: 'start' | 'end';
  value?: V;
  onChange?: (value: V, name?: string) => void;
}

export type BaseFieldExtendedProps<
  V,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  C extends ElementType<any> = ElementType<any>
> = Pick<
  BaseFieldProps<V, C>,
  | 'adornment'
  | 'adornmentPosition'
  | 'color'
  | 'disabled'
  | 'error'
  | 'helperText'
  | 'label'
  | 'name'
  | 'placeholder'
  | 'required'
  | 'size'
  | 'value'
  | 'onChange'
>;
