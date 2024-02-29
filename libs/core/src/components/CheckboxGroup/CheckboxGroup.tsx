import MuiFormControl from '@mui/material/FormControl';
import MuiFormGroup from '@mui/material/FormGroup';
import MuiFormLabel from '@mui/material/FormLabel';
import _set from 'lodash/set';

import Checkbox from '../Checkbox';
import type { CheckboxGroupProps } from './CheckboxGroup.types';
import type { GenericData } from '../../types';

export default function CheckboxGroup<D extends GenericData>({
  title,
  optionProps,
  options,
  onChange,
}: CheckboxGroupProps<D>) {
  const handleChange = (checked: boolean, data?: D) => {
    const newItems: D[] = !options ? [] : [...options];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const index = newItems.indexOf(data!) ?? -1;
    const { propMapping } = optionProps || {};

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
        {options?.map((item, i) => (
          <Checkbox
            {...optionProps}
            key={i}
            data={item}
            onChange={handleChange}
          />
        ))}
      </MuiFormGroup>
    </MuiFormControl>
  );
}
