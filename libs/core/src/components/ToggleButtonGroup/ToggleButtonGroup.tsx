import MuiToggleButton from '@mui/material/ToggleButton';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Icon from '../Icon';
import type { SelectionVariant } from '../../hooks';

import {
  withStoreProps,
  usePropsGetter,
  type GenericData,
} from '../../contexts';

import type {
  ToggleButtonProps,
  ToggleButtonGroupProps,
} from './ToggleButtonGroup.types';

export default (<D extends GenericData, V extends SelectionVariant>() =>
  withStoreProps<D, ToggleButtonGroupProps<D, V>>(function ToggleButtonGroup({
    variant,
    name,
    optionProps,
    records,
    value,
    onChange,
    ...props
  }) {
    const getProps = usePropsGetter<D>();

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
  }))();
