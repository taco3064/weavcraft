import MuiMenuItem from '@mui/material/MenuItem';

import BaseField from '../BaseField';
import { makeStoreProps, type GenericData } from '../../contexts';
import { useOptionsRender } from '../../hooks';
import type { SingleSelectFieldProps } from './SingleSelectField.types';

const withStoreProps = makeStoreProps<SingleSelectFieldProps>();

export default withStoreProps(function SingleSelectField<
  D extends GenericData
>({
  emptyText,
  optionIndicator,
  optionProps,
  records,
  ...props
}: SingleSelectFieldProps<D>) {
  const children = useOptionsRender({ optionIndicator, optionProps, records });
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
});
