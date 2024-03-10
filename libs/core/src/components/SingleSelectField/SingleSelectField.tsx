import MuiMenuItem from '@mui/material/MenuItem';

import BaseField from '../BaseField';
import { useGenerateStoreProps, type GenericData } from '../../contexts';
import { useOptionsRender } from '../../hooks';
import type { SingleSelectFieldProps } from './SingleSelectField.types';

export default function SingleSelectField<D extends GenericData>(
  props: SingleSelectFieldProps<D>
) {
  const { emptyText, optionIndicator, optionProps, records, ...fieldProps } =
    useGenerateStoreProps(props);

  const children = useOptionsRender({ optionIndicator, optionProps, records });
  const displayEmpty = Boolean(emptyText);

  return (
    <BaseField
      {...fieldProps}
      select
      data-testid="SingleSelectField"
      adornmentPosition="start"
      SelectProps={{
        displayEmpty,
        MenuProps: {
          PaperProps: { 'data-testid': 'SingleSelectFieldMenu' },
        },
      }}
    >
      {displayEmpty && (
        <MuiMenuItem value="" data-testid="SingleSelectFieldEmptyOption">
          {emptyText}
        </MuiMenuItem>
      )}

      {children}
    </BaseField>
  );
}
