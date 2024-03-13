import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import MuiToggleButton, {
  type ToggleButtonProps,
} from '@mui/material/ToggleButton';

import type { ControlVariant } from '../../hooks';
import type { ToggleButtonGroupProps } from './ToggleButtonGroup.types';

import {
  getProps,
  useGenerateStoreProps,
  type GenericData,
} from '../../contexts';

export default function ToggleButtonGroup<
  D extends GenericData,
  T extends ControlVariant
>(props: ToggleButtonGroupProps<D, T>) {
  const { name, optionProps, records, value, onChange, ...groupProps } =
    useGenerateStoreProps(props);

  return (
    <MuiToggleButtonGroup
      {...groupProps}
      data-testid="ToggleButtonGroup"
      value={value}
      onChange={(_e, newValue) => onChange?.(newValue, name)}
    >
      {records?.map((option, i) => {
        const { value = i, ...buttonProps } = getProps({
          ...optionProps,
          data: option,
        }) as ToggleButtonProps;

        return (
          <MuiToggleButton
            {...buttonProps}
            key={i}
            value={value}
            data-testid="ToggleButton"
          />
        );
      })}
    </MuiToggleButtonGroup>
  );
}
