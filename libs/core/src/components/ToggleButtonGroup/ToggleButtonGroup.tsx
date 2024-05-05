import MuiToggleButton from '@mui/material/ToggleButton';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import type { JsonObject, Paths } from 'type-fest';

import Icon from '../Icon';
import { withDataStructure, usePropsGetter } from '../../contexts';
import type { SelectionVariant } from '../../hooks';

import type {
  ToggleButtonProps,
  ToggleButtonGroupProps,
} from './ToggleButtonGroup.types';

export default withDataStructure(function ToggleButtonGroup<
  D extends JsonObject,
  V extends SelectionVariant,
  Path extends Extract<Paths<D>, string>
>({
  variant,
  name,
  optionProps,
  records,
  value,
  onChange,
  ...props
}: ToggleButtonGroupProps<D, V, Path>) {
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
});
