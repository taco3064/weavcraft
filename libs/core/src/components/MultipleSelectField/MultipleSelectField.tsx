import MuiBox from '@mui/material/Box';
import MuiChip from '@mui/material/Chip';
import _get from 'lodash/get';
import type { JsonObject, Paths } from 'type-fest';

import BaseField from '../BaseField';
import { useOptionsRender, useStoreProps } from '../../hooks';
import type { MultipleSelectFieldProps } from './MultipleSelectField.types';

export default function MultipleSelectField<
  D extends JsonObject,
  Path extends Extract<Paths<D>, string>
>(props: MultipleSelectFieldProps<D, Path>) {
  const [
    StoreProvider,
    { optionIndicator, optionProps, records, ...fieldProps },
  ] = useStoreProps(props);

  const propMapping = optionProps?.propMapping as Partial<
    Record<string, string>
  >;

  const children = useOptionsRender<'multiple', D, Path>({
    optionIndicator,
    optionProps,
    records,
  });

  const selected = fieldProps.value || [];

  return (
    <StoreProvider>
      <BaseField
        {...fieldProps}
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
                      fieldProps.onChange?.(
                        selected.filter((v) => v !== value),
                        fieldProps.name
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
    </StoreProvider>
  );
}
