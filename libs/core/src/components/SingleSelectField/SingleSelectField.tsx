import MuiMenuItem from '@mui/material/MenuItem';
import type { JsonObject, Paths } from 'type-fest';

import BaseField from '../BaseField';
import { useOptionsRender } from '../../hooks';
import { withDataStructure } from '../../contexts';
import type { SingleSelectFieldProps } from './SingleSelectField.types';

export default withDataStructure(function SingleSelectField<
  D extends JsonObject,
  Path extends Extract<Paths<D>, string>
>({
  emptyText,
  optionIndicator,
  optionProps,
  records,
  ...props
}: SingleSelectFieldProps<D, Path>) {
  const displayEmpty = Boolean(emptyText);

  const children = useOptionsRender<'single', D, Path>({
    optionIndicator,
    optionProps,
    records,
  });

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
});
