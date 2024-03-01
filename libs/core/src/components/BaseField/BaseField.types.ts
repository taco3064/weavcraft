import MuiTextField from '@mui/material/TextField';
import type { ComponentProps, ElementType } from 'react';

type MuiTextFieldProps = Omit<
  ComponentProps<typeof MuiTextField>,
  'defaultValue' | 'value' | 'onChange'
>;

export type MuiInputProps = NonNullable<MuiTextFieldProps['InputProps']>;

export interface BaseFieldProps<
  V,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  C extends ElementType<any> = ElementType<any>
> extends Omit<MuiTextFieldProps, 'InputProps'> {
  value?: V;
  onChange?: (value: V, name?: string) => void;

  InputProps?: Omit<MuiInputProps, 'inputComponent' | 'inputProps'> & {
    inputComponent?: C;
    inputProps?: ComponentProps<C>;
  };
}

export type BaseFieldExtendedProps<
  V,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  C extends ElementType<any> = ElementType<any>
> = Pick<
  BaseFieldProps<V, C>,
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
