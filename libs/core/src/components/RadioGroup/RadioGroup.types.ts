import type { GenericData } from '../../contexts';
import type { GroupProps } from '../../hooks';
import type { SelectionControlProps } from '../SelectionControl';

type BaseRadioProps<D extends GenericData> = Omit<
  SelectionControlProps<'radio', D>,
  'checked'
>;

export interface RadioGroupProps<D extends GenericData>
  extends GroupProps<'single', BaseRadioProps<D>> {
  title?: string;
}
