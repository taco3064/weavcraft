import MuiTextField from '@mui/material/TextField';
import type { ComponentProps, ElementType, ReactNode } from 'react';

type MuiTextFieldProps = Omit<
  ComponentProps<typeof MuiTextField>,
  'defaultValue' | 'value' | 'onChange'
>;

type BasePropNames =
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
  | 'onChange';

export type MuiInputProps = NonNullable<MuiTextFieldProps['InputProps']>;

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
  C extends ElementType<any> = ElementType<any>
> extends Omit<MuiTextFieldProps, 'InputProps'> {
  InputProps?: BaseInputProps<C>;
  adornment?: ReactNode;
  adornmentPosition?: 'start' | 'end';
  value?: V;
  onChange?: (value: V | undefined, name?: string) => void;
}

export type BaseFieldExtendedProps<
  V,
  C extends ElementType<any> = ElementType<any>,
  K extends keyof BaseFieldProps<V, C> | never = never
> = Pick<BaseFieldProps<V, C>, BasePropNames | K>;

export type BaseFieldWithoutInputProps<
  V,
  K extends keyof BaseFieldProps<V> | never = never
> = Pick<BaseFieldProps<V>, BasePropNames | K>;
