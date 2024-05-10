import type { Breakpoint } from '@mui/material/styles';
import type { JsonObject, Paths } from 'type-fest';
import type { Property } from 'csstype';
import type { ReactNode } from 'react';

import type { BaseFieldProps } from '../BaseField';
import type { CardProps } from '../Card';
import type { IconCode } from '../Icon';
import type { PropsWithMappedData } from '../../hooks';

type BaseCardProps<D extends JsonObject> = Pick<
  CardProps<D>,
  'avatar' | 'children' | 'description' | 'maxWidth' | 'title'
>;

/**
 * ? Form Component Props Notes
 * * - `action` and `actionJustify` are used in the `Stepper` component
 * * - `children` is ReactNode, but it actually only allows the insertion of components related to `BaseField`
 */
interface BaseFormProps<D extends JsonObject>
  extends BaseCardProps<D>,
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

export type FormProps<D extends JsonObject> = PropsWithMappedData<
  D,
  BaseFormProps<D>,
  'title' | 'description'
>;
