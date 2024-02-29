import type { CheckboxProps } from '../Checkbox';
import type { GenericData } from '../../types';

export interface CheckboxGroupProps<D extends GenericData> {
  title?: string;
  itemProps?: Omit<CheckboxProps<D>, 'data'>;
  items?: D[];
  onChange?: (data?: D[]) => void;
}
