import type { BaseFieldWithoutInputProps } from '../BaseField';
import type { BaseListItemProps } from '../ListItem';
import type { GroupProps } from '../../hooks';

import type {
  ActionElement,
  BaseActionProps,
  GenericData,
  MappableProps,
} from '../../types';

interface BaseOptionProps extends Omit<BaseListItemProps, 'href' | 'selected'> {
  value?: any;
}

export interface SingleSelectFieldProps<
  D extends GenericData,
  I extends BaseActionProps
> extends GroupProps<'single', D, MappableProps<D, BaseOptionProps>>,
    Omit<BaseFieldWithoutInputProps<unknown>, 'value' | 'onChange'> {
  emptyText?: string;
  optionIndicator?: ActionElement<D, I>;
}
