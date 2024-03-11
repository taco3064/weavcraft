import type { GenericData } from '../../contexts';
import type { GroupProps } from '../../hooks';
import type { SelectionControlProps } from '../SelectionControl';

type BaseCheckboxProps<D extends GenericData> = Omit<
  SelectionControlProps<'checkbox', D>,
  'checked'
>;

export interface CheckboxGroupProps<D extends GenericData>
  extends GroupProps<'multiple', BaseCheckboxProps<D>> {
  title?: string;
}
