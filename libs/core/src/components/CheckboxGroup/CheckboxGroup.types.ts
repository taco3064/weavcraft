import type { CheckboxProps } from '../Checkbox';
import type { GenericData } from '../../types';

export interface CheckboxGroupProps<D extends GenericData> {
  title?: string;
  optionProps?: Omit<CheckboxProps<D>, 'data'>;
  options?: D[];
  onChange?: (data?: D[]) => void;
}
