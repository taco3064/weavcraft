import MuiFormControl from '@mui/material/FormControl';
import MuiFormGroup from '@mui/material/FormGroup';
import MuiFormLabel from '@mui/material/FormLabel';
import type { JsonObject, Paths } from 'type-fest';

import Selection from '../Selection';
import { useMultipleSelection, useStoreProps } from '../../hooks';

import type {
  BaseCheckboxProps,
  CheckboxGroupProps,
} from './CheckboxGroup.types';

export default function CheckboxGroup<
  D extends JsonObject,
  Path extends Extract<Paths<D>, string>
>(props: CheckboxGroupProps<D, Path>) {
  const checkboxGroupProps = useStoreProps(props);
  const { name, title, optionProps, records } = checkboxGroupProps;

  const { selected, onChange } = useMultipleSelection<
    D,
    Path,
    BaseCheckboxProps<D>
  >(checkboxGroupProps);

  return (
    <MuiFormControl component="fieldset" data-testid="CheckboxGroup">
      {title && <MuiFormLabel component="legend">{title}</MuiFormLabel>}

      <MuiFormGroup>
        {records?.map((data, i) => (
          <Selection
            name={name}
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
