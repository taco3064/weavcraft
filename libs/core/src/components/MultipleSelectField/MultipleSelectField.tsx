import MuiBox from '@mui/material/Box';
import MuiChip from '@mui/material/Chip';
import _get from 'lodash/get';

import BaseField from '../BaseField';
import { useOptionsRender } from '../../hooks';
import type { BaseSlotProps, GenericData } from '../../types';
import type { MultipleSelectFieldProps } from './MultipleSelectField.types';

export default function MultipleSelectField<
  D extends GenericData,
  I extends BaseSlotProps
>({
  optionIndicator,
  optionProps,
  options,
  ...props
}: MultipleSelectFieldProps<D, I>) {
  const propMapping = optionProps?.propMapping || {};

  const children = useOptionsRender({ optionIndicator, optionProps, options });
  const selected = props.value || [];

  return (
    <BaseField
      {...props}
      select
      value={selected}
      data-testid="MultipleSelectField"
      SelectProps={{
        multiple: true,
        renderValue: () => (
          <MuiBox display="flex" flexWrap="wrap" gap={0.5}>
            {selected.map((value, i) => {
              const data = options?.find(
                (option) => _get(option, propMapping.value as string) === value
              );

              return (
                <MuiChip
                  key={i}
                  data-testid="MultipleSelectFieldChip"
                  label={_get(data, propMapping.primary as string) as string}
                  onDelete={() =>
                    props.onChange?.(
                      selected.filter((v) => v !== value),
                      props.name
                    )
                  }
                />
              );
            })}
          </MuiBox>
        ),
        MenuProps: {
          PaperProps: { 'data-testid': 'MultipleSelectFieldMenu' },
        },
      }}
    >
      {children}
    </BaseField>
  );
}
