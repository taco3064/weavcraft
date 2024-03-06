import MuiFormControl from '@mui/material/FormControl';
import MuiFormGroup from '@mui/material/FormGroup';
import MuiFormLabel from '@mui/material/FormLabel';

import SelectionControl from '../SelectionControl';
import { useMultipleSelection } from '../../hooks';
import type { CheckboxGroupProps } from './CheckboxGroup.types';
import type { GenericData } from '../../types';

export default function CheckboxGroup<D extends GenericData>(
  props: CheckboxGroupProps<D>
) {
  const { title, optionProps, options } = props;
  const { selected, onChange } = useMultipleSelection<D>(props);

  return (
    <MuiFormControl component="fieldset" data-testid="CheckboxGroup">
      {title && <MuiFormLabel component="legend">{title}</MuiFormLabel>}

      <MuiFormGroup>
        {options?.map((item, i) => (
          <SelectionControl
            name={props.name}
            {...optionProps}
            variant="checkbox"
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
