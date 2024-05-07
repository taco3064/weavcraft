import MuiCheckbox from '@mui/material/Checkbox';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import MuiRadio from '@mui/material/Radio';
import type { JsonObject } from 'type-fest';

import { useGenerateProps } from '../../hooks';
import type { SelectionProps, SelectionVariant } from './Selection.types';

export default function Selection<
  D extends JsonObject,
  V extends SelectionVariant = 'checkbox'
>(props: SelectionProps<D, V>) {
  const [
    GeneratePropsProvider,
    {
      label,
      labelPlacement,
      checked,
      disabled,
      required,
      variant,
      onChange,
      ...controlProps
    },
    { data },
  ] = useGenerateProps<D, SelectionProps<D, V>>(props);

  const Control = variant === 'radio' ? MuiRadio : MuiCheckbox;

  const control = (
    <Control
      {...controlProps}
      {...{ disabled, required }}
      defaultChecked={checked}
      data-testid="Selection"
      onChange={(_e, checked) => onChange?.(checked, data)}
    />
  );

  return (
    <GeneratePropsProvider>
      {!label ? (
        control
      ) : (
        <MuiFormControlLabel
          {...{ label, labelPlacement, disabled, required, control }}
          data-testid="FormControlLabel"
        />
      )}
    </GeneratePropsProvider>
  );
}
