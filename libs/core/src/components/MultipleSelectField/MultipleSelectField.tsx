import MuiBox from '@mui/material/Box';
import MuiChip from '@mui/material/Chip';
import _get from 'lodash/get';
import type { JsonObject, Paths } from 'type-fest';

import BaseField from '../BaseField';
import { withDataStructure } from '../../contexts';
import { useOptionsRender } from '../../hooks';
import type { MultipleSelectFieldProps } from './MultipleSelectField.types';

export default withDataStructure(function MultipleSelectField<
  D extends JsonObject,
  Path extends Extract<Paths<D>, string>
>({
  optionIndicator,
  optionProps,
  records,
  ...props
}: MultipleSelectFieldProps<D, Path>) {
  const propMapping = optionProps?.propMapping as Partial<
    Record<string, string>
  >;

  const children = useOptionsRender<'multiple', D, Path>({
    optionIndicator,
    optionProps,
    records,
  });

  const selected = props.value || [];

  return (
    <BaseField
      {...props}
      select
      value={selected}
      data-testid="MultipleSelectField"
      adornmentPosition="start"
      SelectProps={{
        multiple: true,
        renderValue: () => (
          <MuiBox display="flex" flexWrap="wrap" gap={0.5}>
            {selected.map((value, i) => {
              const data = records?.find(
                (data) => _get(data, propMapping?.value as string) === value
              );

              return (
                <MuiChip
                  key={i}
                  data-testid="MultipleSelectFieldChip"
                  label={_get(data, propMapping?.primary as string) as string}
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
});
