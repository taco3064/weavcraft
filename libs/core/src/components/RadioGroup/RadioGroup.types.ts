import type { GenericData } from '../../types';
import type { GroupProps } from '../../hooks';
import type { SelectionControlProps } from '../SelectionControl';

type BaseRadioProps<D extends GenericData> = Omit<
  SelectionControlProps<'radio', D>,
  'checked' | 'data'
>;

export interface RadioGroupProps<D extends GenericData>
  extends GroupProps<'single', D, BaseRadioProps<D>> {
  title?: string;
}
