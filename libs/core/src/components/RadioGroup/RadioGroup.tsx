import MuiFormControl from '@mui/material/FormControl';
import MuiFormGroup from '@mui/material/FormGroup';
import MuiFormLabel from '@mui/material/FormLabel';

import SelectionControl from '../SelectionControl';
import { useSingleSelectionGroup } from '../../hooks';
import type { RadioGroupProps } from './RadioGroup.types';
import type { GenericData } from '../../types';

export default function RadioGroup<D extends GenericData>(
  props: RadioGroupProps<D>
) {
  const { title, optionProps, options } = props;
  const { selected, onChange } = useSingleSelectionGroup<D>(props);

  return (
    <MuiFormControl component="fieldset" data-testid="RadioGroup">
      {title && <MuiFormLabel component="legend">{title}</MuiFormLabel>}

      <MuiFormGroup>
        {options?.map((item, i) => (
          <SelectionControl
            {...optionProps}
            variant="radio"
            key={i}
            checked={selected[i]}
            data={item}
            onChange={onChange}
          />
        ))}
      </MuiFormGroup>
    </MuiFormControl>
  );
}
