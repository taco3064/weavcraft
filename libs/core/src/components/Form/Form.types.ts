import type { Breakpoint } from '@mui/material/styles';
import type { JsonObject, Paths } from 'type-fest';
import type { Property } from 'csstype';
import type { ReactNode } from 'react';

import type { BaseCardProps } from '../Card';
import type { BaseFieldProps } from '../BaseField';
import type { PropsWithMappedData } from '../../contexts';
import type { IconCode } from '../Icon';

type BaseFormProps = Pick<
  BaseCardProps,
  'avatar' | 'children' | 'description' | 'maxWidth' | 'title'
>;

/**
 * ? Form Component Props Notes
 * * - `action` and `actionJustify` are used in the `Stepper` component
 * * - `children` is ReactNode, but it actually only allows the insertion of components related to `BaseField`
 */
export interface FormProps<D extends JsonObject>
  extends BaseFormProps,
    Pick<BaseFieldProps<any>, 'color' | 'size' | 'variant'> {
  action?: ReactNode;
  actionJustify?: Property.JustifyContent;
  breakpoint?: Exclude<Breakpoint, 'xs'>;
  fullWidthFields?: (Paths<D> | string)[];
  resetIcon?: IconCode;
  submitIcon?: IconCode;
  onSubmit?: (data: D) => void;
  onValidate?: (data: D) => Promise<boolean> | boolean;
}

export type MappablePropNames = keyof Pick<
  BaseFormProps,
  'title' | 'description'
>;

export type WrappedProps<D extends JsonObject> = PropsWithMappedData<
  D,
  FormProps<D>,
  MappablePropNames
>;
