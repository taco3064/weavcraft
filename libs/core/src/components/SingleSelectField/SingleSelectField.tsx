import MuiMenuItem from '@mui/material/MenuItem';

import BaseField from '../BaseField';
import { useOptionsRender } from '../../hooks';
import type { BaseSlotProps, GenericData } from '../../types';
import type { SingleSelectFieldProps } from './SingleSelectField.types';

export default function SingleSelectField<
  D extends GenericData,
  I extends BaseSlotProps
>({
  emptyText,
  optionIndicator,
  optionProps,
  options,
  ...props
}: SingleSelectFieldProps<D, I>) {
  const children = useOptionsRender({ optionIndicator, optionProps, options });
  const displayEmpty = Boolean(emptyText);

  return (
    <BaseField
      {...props}
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
