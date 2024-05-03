import type { GenericData } from '../../contexts';
import type { SelectionGroupProps } from '../../hooks';
import type { SelectionProps } from '../Selection';

type BaseCheckboxProps<D extends GenericData> = Omit<
  SelectionProps<'checkbox', D>,
  'checked'
>;

export interface CheckboxGroupProps<D extends GenericData = {}>
  extends SelectionGroupProps<'multiple', D, BaseCheckboxProps<D>> {
  title?: string;
}
