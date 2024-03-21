import type { Breakpoint } from '@mui/material/styles';

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
  breakpoint?: Exclude<Breakpoint, 'xs'>;
  fullWidthFields?: (PropertyPath<D> | string)[];
  resetIcon?: IconCode;
  submitIcon?: IconCode;
  onSubmit?: (data: D) => void;
}

export type MappablePropNames = keyof Pick<FormProps, 'title' | 'description'>;

export type WrappedProps<D extends GenericData> = PropsWithMappedData<
  D,
  FormProps<D>,
  MappablePropNames
>;
