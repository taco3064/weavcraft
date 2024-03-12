import type { GenericData } from '../../contexts';
import type { GroupProps } from '../../hooks';
import type { SelectionProps } from '../Selection';

type BaseRadioProps<D extends GenericData> = Omit<
  SelectionProps<'radio', D>,
  'checked'
>;

export interface RadioGroupProps<D extends GenericData>
  extends GroupProps<'single', BaseRadioProps<D>> {
  title?: string;
}
