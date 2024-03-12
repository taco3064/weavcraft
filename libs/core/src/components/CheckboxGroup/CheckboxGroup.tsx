import MuiFormControl from '@mui/material/FormControl';
import MuiFormGroup from '@mui/material/FormGroup';
import MuiFormLabel from '@mui/material/FormLabel';

import Selection from '../Selection';
import { useGenerateStoreProps, type GenericData } from '../../contexts';
import { useMultipleSelection } from '../../hooks';
import type { CheckboxGroupProps } from './CheckboxGroup.types';

export default function CheckboxGroup<D extends GenericData>(
  props: CheckboxGroupProps<D>
) {
  const { title, ...groupProps } = useGenerateStoreProps(props);
  const { optionProps, records } = groupProps;
  const { selected, onChange } = useMultipleSelection<D>(groupProps);

  return (
    <MuiFormControl component="fieldset" data-testid="CheckboxGroup">
      {title && <MuiFormLabel component="legend">{title}</MuiFormLabel>}

      <MuiFormGroup>
        {records?.map((data, i) => (
          <Selection
            name={props.name}
            {...optionProps}
            variant="checkbox"
            key={i}
            checked={selected[i]}
            data={data}
            onChange={(checked, data) => onChange(checked, data as D)}
          />
        ))}
      </MuiFormGroup>
    </MuiFormControl>
  );
}
