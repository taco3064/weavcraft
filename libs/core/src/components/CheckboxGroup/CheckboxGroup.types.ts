import type { GenericData } from '../../contexts';
import type { GroupProps } from '../../hooks';
import type { SelectionProps } from '../Selection';

type BaseCheckboxProps<D extends GenericData> = Omit<
  SelectionProps<'checkbox', D>,
  'checked'
>;

export interface CheckboxGroupProps<D extends GenericData>
  extends GroupProps<'multiple', BaseCheckboxProps<D>> {
  title?: string;
}
