import MuiFormControl from '@mui/material/FormControl';
import MuiFormGroup from '@mui/material/FormGroup';
import MuiFormLabel from '@mui/material/FormLabel';

import Selection from '../Selection';
import { makeStoreProps, type GenericData } from '../../contexts';
import { useSingleSelection } from '../../hooks';
import type { RadioGroupProps } from './RadioGroup.types';

const withStoreProps = makeStoreProps<RadioGroupProps>();

export default withStoreProps(function RadioGroupProps<D extends GenericData>(
  props: RadioGroupProps<D>
) {
  const { title, optionProps, records } = props;
  const { selected, onChange } = useSingleSelection(props);

  return (
    <MuiFormControl component="fieldset" data-testid="RadioGroup">
      {title && <MuiFormLabel component="legend">{title}</MuiFormLabel>}

      <MuiFormGroup>
        {records?.map((data, i) => (
          <Selection
            name={props.name}
            {...optionProps}
            variant="radio"
            key={i}
            checked={selected[i]}
            data={data}
            onChange={(checked, data) => onChange(checked, data as D)}
          />
        ))}
      </MuiFormGroup>
    </MuiFormControl>
  );
});
