import MuiMenuItem from '@mui/material/MenuItem';

import BaseField from '../BaseField';
import { withStoreProps, type GenericData } from '../../contexts';
import { useOptionsRender } from '../../hooks';
import type { SingleSelectFieldProps } from './SingleSelectField.types';

export default (<D extends GenericData>() =>
  withStoreProps<D, SingleSelectFieldProps<D>>(function SingleSelectField({
    emptyText,
    optionIndicator,
    optionProps,
    records,
    ...props
  }) {
    const displayEmpty = Boolean(emptyText);

    const children = useOptionsRender({
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
  }))();
