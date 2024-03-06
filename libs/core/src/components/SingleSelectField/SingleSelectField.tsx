import MuiMenuItem from '@mui/material/MenuItem';

import BaseField from '../BaseField';
import ListItem from '../ListItem';
import { getProps, useSlotPropsTransformation } from '../../hooks';
import type { BaseActionProps, GenericData } from '../../types';
import type { SingleSelectFieldProps } from './SingleSelectField.types';

export default function SingleSelectField<
  D extends GenericData,
  I extends BaseActionProps
>({
  emptyText,
  optionIndicator,
  optionProps,
  options,
  ...props
}: SingleSelectFieldProps<D, I>) {
  const ItemIndicator = useSlotPropsTransformation(optionIndicator);
  const displayEmpty = Boolean(emptyText);

  return (
    <BaseField
      {...props}
      select
      data-testid="SingleSelectField"
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

      {options?.map((item, i) => {
        const { disabled, value, ...itemProps } = getProps({
          ...optionProps,
          data: item,
        });

        return (
          <MuiMenuItem
            {...{ disabled, value }}
            disableGutters
            key={i}
            data-testid="SingleSelectFieldOption"
          >
            <ListItem
              {...itemProps}
              variant="item"
              data={item}
              indicator={
                ItemIndicator.Slot && (
                  <ItemIndicator.Slot {...ItemIndicator.getSlotProps(item)} />
                )
              }
            />
          </MuiMenuItem>
        );
      })}
    </BaseField>
  );
}
