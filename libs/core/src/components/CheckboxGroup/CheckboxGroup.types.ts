import type { CheckboxProps } from '../Checkbox';
import type { GenericData } from '../../types';
import type { GroupProps } from '../../hooks';

type BaseCheckboxProps<D extends GenericData> = Omit<
  CheckboxProps<D>,
  'checked' | 'data'
>;

export interface CheckboxGroupProps<D extends GenericData>
  extends GroupProps<'multiple', D, BaseCheckboxProps<D>> {
  title?: string;
}
