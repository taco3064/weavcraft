import type { GenericData } from '../../contexts';
import type { SelectionGroupProps } from '../../hooks';
import type { SelectionProps } from '../Selection';

type BaseRadioProps<D extends GenericData> = Omit<
  SelectionProps<'radio', D>,
  'checked'
>;

export interface RadioGroupProps<D extends GenericData = {}>
  extends SelectionGroupProps<'single', D, BaseRadioProps<D>> {
  title?: string;
}
