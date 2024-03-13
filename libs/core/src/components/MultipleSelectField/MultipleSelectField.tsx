import MuiBox from '@mui/material/Box';
import MuiChip from '@mui/material/Chip';
import _get from 'lodash/get';

import BaseField from '../BaseField';
import { useGenerateStoreProps, type GenericData } from '../../contexts';
import { useOptionsRender } from '../../hooks';
import type { MultipleSelectFieldProps } from './MultipleSelectField.types';

export default function MultipleSelectField<D extends GenericData>(
  props: MultipleSelectFieldProps<D>
) {
  const { optionIndicator, optionProps, records, ...fieldProps } =
    useGenerateStoreProps(props);

  const propMapping = optionProps?.propMapping || {};

  const children = useOptionsRender({
    optionIndicator,
    optionProps,
    records,
  });

  const selected = fieldProps.value || [];

  return (
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
                (data) => _get(data, propMapping.value as string) === value
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