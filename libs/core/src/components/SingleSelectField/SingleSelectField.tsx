import MuiMenuItem from '@mui/material/MenuItem';
import type { JsonObject, Paths } from 'type-fest';

import BaseField from '../BaseField';
import { useOptionsRender, useStoreProps } from '../../hooks';
import type { SingleSelectFieldProps } from './SingleSelectField.types';

export default function SingleSelectField<
  D extends JsonObject,
  Path extends Extract<Paths<D>, string>
>(props: SingleSelectFieldProps<D, Path>) {
  const { emptyText, optionIndicator, optionProps, records, ...fieldProps } =
    useStoreProps(props);

  const displayEmpty = Boolean(emptyText);

  const children = useOptionsRender<'single', D, Path>({
    optionIndicator,
    optionProps,
    records,
  });

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
