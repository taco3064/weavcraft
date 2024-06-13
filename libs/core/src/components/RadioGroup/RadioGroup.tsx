import MuiFormControl from '@mui/material/FormControl';
import MuiFormGroup from '@mui/material/FormGroup';
import MuiFormLabel from '@mui/material/FormLabel';
import type { JsonObject, Paths } from 'type-fest';

import Selection from '../Selection';
import { useSingleSelection, useStoreProps } from '../../hooks';
import type { BaseRadioProps, RadioGroupProps } from './RadioGroup.types';

export default function RadioGroup<
  D extends JsonObject,
  Path extends Extract<Paths<D>, string>
>(props: RadioGroupProps<D, Path>) {
  const radioGroupProps = useStoreProps(props);
  const { name, title, optionProps, records } = radioGroupProps;

  const { selected, onChange } = useSingleSelection<D, Path, BaseRadioProps<D>>(
    radioGroupProps
  );

  return (
    <MuiFormControl component="fieldset" data-testid="RadioGroup">
      {title && <MuiFormLabel component="legend">{title}</MuiFormLabel>}

      <MuiFormGroup>
        {records?.map((data, i) => (
          <Selection
            name={name}
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
}
