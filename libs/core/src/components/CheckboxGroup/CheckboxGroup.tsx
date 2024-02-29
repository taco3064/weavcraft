import MuiFormControl from '@mui/material/FormControl';
import MuiFormGroup from '@mui/material/FormGroup';
import MuiFormLabel from '@mui/material/FormLabel';
import _set from 'lodash/set';

import Checkbox from '../Checkbox';
import type { CheckboxGroupProps } from './CheckboxGroup.types';
import type { GenericData } from '../../types';

export default function CheckboxGroup<D extends GenericData>({
  title,
  itemProps,
  items,
  onChange,
}: CheckboxGroupProps<D>) {
  const handleChange = (checked: boolean, data?: D) => {
    const newItems: D[] = !items ? [] : [...items];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const index = newItems.indexOf(data!) ?? -1;
    const { propMapping } = itemProps || {};

    if (!propMapping?.checked || !data || index < 0) {
      return onChange?.(newItems);
    }

    newItems.splice(index, 1, _set({ ...data }, propMapping?.checked, checked));
    onChange?.(newItems);
  };

  return (
    <MuiFormControl component="fieldset" data-testid="CheckboxGroup">
      {title && <MuiFormLabel component="legend">{title}</MuiFormLabel>}

      <MuiFormGroup>
        {items?.map((item, i) => (
          <Checkbox
            {...itemProps}
            key={i}
            data={item}
            onChange={handleChange}
          />
        ))}
      </MuiFormGroup>
    </MuiFormControl>
  );
}
