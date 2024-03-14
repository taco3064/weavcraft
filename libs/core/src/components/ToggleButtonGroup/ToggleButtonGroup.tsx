import MuiToggleButton from '@mui/material/ToggleButton';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Icon from '../Icon';
import type { ControlVariant } from '../../hooks';

import {
  makeStoreProps,
  usePropsGenerator,
  type GenericData,
} from '../../contexts';

import type {
  ToggleButtonProps,
  ToggleButtonGroupProps,
} from './ToggleButtonGroup.types';

const withStoreProps = makeStoreProps<ToggleButtonGroupProps>();

export default withStoreProps(function ToggleButtonGroup<
  D extends GenericData,
  T extends ControlVariant
>({
  variant,
  name,
  optionProps,
  records,
  value,
  onChange,
  ...props
}: ToggleButtonGroupProps<D, T>) {
  const getProps = usePropsGenerator<D>();

  return (
    <MuiToggleButtonGroup
      {...props}
      data-testid="ToggleButtonGroup"
      exclusive={variant !== 'multiple'}
      defaultValue={value as never}
      onChange={(_e, newValue) => onChange?.(newValue, name)}
    >
      {records?.map((option, i) => {
        const {
          icon,
          text,
          value = i,
          ...buttonProps
        } = getProps<ToggleButtonProps<D>>({
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
});
