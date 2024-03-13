import MuiToggleButton from '@mui/material/ToggleButton';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Icon from '../Icon';
import type { ControlVariant } from '../../hooks';

import {
  usePropsGenerator,
  useGenerateStoreProps,
  type GenericData,
} from '../../contexts';

import type {
  ToggleButtonProps,
  ToggleButtonGroupProps,
} from './ToggleButtonGroup.types';

export default function ToggleButtonGroup<
  D extends GenericData,
  T extends ControlVariant
>(props: ToggleButtonGroupProps<D, T>) {
  const getProps = usePropsGenerator();

  const {
    variant = 'single',
    name,
    optionProps,
    records,
    value,
    onChange,
    ...groupProps
  } = useGenerateStoreProps(props);

  return (
    <MuiToggleButtonGroup
      {...groupProps}
      data-testid="ToggleButtonGroup"
      exclusive={variant === 'single'}
      defaultValue={value as never}
      onChange={(_e, newValue) => onChange?.(newValue, name)}
    >
      {records?.map((option, i) => {
        const {
          icon,
          text,
          value = i,
          ...buttonProps
        } = getProps<D, ToggleButtonProps<D>>({
          ...optionProps,
          data: option,
        });

        return (
          <MuiToggleButton
            {...buttonProps}
            key={i}
            value={value}
            data-testid="ToggleButton"
          >
            {icon ? <Icon code={icon} /> : text}
          </MuiToggleButton>
        );
      })}
    </MuiToggleButtonGroup>
  );
}
