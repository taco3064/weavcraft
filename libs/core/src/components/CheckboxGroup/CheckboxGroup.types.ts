import type { GenericData } from '../../types';
import type { GroupProps } from '../../hooks';
import type { SelectionControlProps } from '../SelectionControl';

type BaseCheckboxProps<D extends GenericData> = Omit<
  SelectionControlProps<'checkbox', D>,
  'checked' | 'data'
>;

export interface CheckboxGroupProps<D extends GenericData>
  extends GroupProps<'multiple', D, BaseCheckboxProps<D>> {
  title?: string;
}
