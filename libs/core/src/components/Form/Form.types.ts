import type { Breakpoint } from '@mui/material/styles';
import type { Property } from 'csstype';
import type { ReactNode } from 'react';

import type { BaseCardProps } from '../Card';
import type { BaseFieldProps } from '../BaseField';
import type { IconCode } from '../Icon';

import type {
  GenericData,
  PropertyPath,
  PropsWithMappedData,
} from '../../contexts';

type BaseFormProps = Pick<
  BaseCardProps,
  'avatar' | 'children' | 'description' | 'maxWidth' | 'title'
>;

export interface FormProps<D extends GenericData = {}>
  extends BaseFormProps,
    Pick<BaseFieldProps<any>, 'color' | 'size' | 'variant'> {
  action?: ReactNode;
  actionJustify?: Property.JustifyContent;
  breakpoint?: Exclude<Breakpoint, 'xs'>;
  fullWidthFields?: (PropertyPath<D> | string)[];
  resetIcon?: IconCode;
  submitIcon?: IconCode;
  onSubmit?: (data: D) => void;
  onValidate?: (data: D) => Promise<boolean> | boolean;
}

export type MappablePropNames = keyof Pick<FormProps, 'title' | 'description'>;

export type WrappedProps<D extends GenericData> = PropsWithMappedData<
  D,
  Omit<FormProps<D>, 'action' | 'actionJustify'>,
  MappablePropNames
>;
