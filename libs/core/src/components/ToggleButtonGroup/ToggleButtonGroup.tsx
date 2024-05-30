import MuiToggleButton from '@mui/material/ToggleButton';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import type { JsonObject, Paths } from 'type-fest';

import Icon from '../Icon';

import {
  usePropsGetter,
  useStoreProps,
  type SelectionVariant,
} from '../../hooks';

import type {
  ToggleButtonProps,
  ToggleButtonGroupProps,
} from './ToggleButtonGroup.types';

export default function ToggleButtonGroup<
  D extends JsonObject,
  V extends SelectionVariant,
  Path extends Extract<Paths<D>, string>
>(props: ToggleButtonGroupProps<D, V, Path>) {
  const [
    StoreProvider,
    { variant, name, optionProps, records, value, onChange, ...groupProps },
  ] = useStoreProps(props);

  const getProps = usePropsGetter<D>();

  return (
    <StoreProvider>
      <MuiToggleButtonGroup
        {...groupProps}
        data-testid="ToggleButtonGroup"
        exclusive={variant !== 'multiple'}
        value={(value ?? []) as never}
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
    </StoreProvider>
  );
}
