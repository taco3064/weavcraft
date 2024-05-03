import MuiMenuItem from '@mui/material/MenuItem';
import MuiListItem from '@mui/material/ListItem';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import MuiListItemText from '@mui/material/ListItemText';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';

import { usePropsGetter, useComponentSlot } from '../../contexts';
import type { GenericData } from '../../contexts';

import type {
  BaseSelectFieldProps,
  SelectionGroupProps,
  SelectionVariant,
} from './useSelection.types';

export function useMultipleSelection<D extends GenericData>({
  name,
  optionProps,
  records,
  value,
  onChange,
}: SelectionGroupProps<'multiple', D, any>) {
  type GroupValue = NonNullable<typeof value>[number];

  return {
    selected: useMemo<boolean[]>(
      () =>
        records?.map((data) => {
          const { value: path } = optionProps?.propMapping || {};
          const optionValue = _get(data, path as string) as GroupValue;

          return value?.includes(optionValue) || false;
        }) || [],
      [optionProps?.propMapping, records, value]
    ),

    onChange: (checked: boolean, data?: D) => {
      const { value: path } = optionProps?.propMapping || {};
      const optionValue = _get(data, path as string) as GroupValue;

      if (!_isEmpty(optionValue)) {
        const values = new Set<GroupValue>([...(value || [])]);

        values[checked ? 'add' : 'delete'](optionValue);
        onChange?.([...values], name);
      }
    },
  };
}

export function useSingleSelection<D extends GenericData>({
  name,
  optionProps,
  records,
  value,
  onChange,
}: SelectionGroupProps<'single', D, any>) {
  type GroupValue = NonNullable<typeof value>;

  return {
    selected: useMemo<boolean[]>(
      () =>
        records?.map((data) => {
          const { value: path } = optionProps?.propMapping || {};
          const optionValue = _get(data, path as string) as GroupValue;

          return value === optionValue;
        }) || [],
      [optionProps?.propMapping, records, value]
    ),

    onChange: (checked: boolean, data?: D) => {
      const { value: path } = optionProps?.propMapping || {};
      const optionValue = _get(data, path as string) as GroupValue;

      if (checked) {
        onChange?.(optionValue || undefined, name);
      }
    },
  };
}

export function useOptionsRender<
  V extends SelectionVariant,
  D extends GenericData
>({ optionIndicator, optionProps, records }: BaseSelectFieldProps<V, D>) {
  const ItemIndicator = useComponentSlot(optionIndicator);
  const getProps = usePropsGetter();

  return records?.map((data, i) => {
    const { disabled, primary, secondary, value } = getProps({
      ...optionProps,
      data,
    });

    return (
      <MuiMenuItem
        key={i}
        disableGutters
        disabled={disabled}
        value={value as string}
        data-testid="SingleSelectFieldOption"
      >
        <MuiListItem component="div">
          {!ItemIndicator.Slot ? null : (
            <MuiListItemIcon>
              <ItemIndicator.Slot {...ItemIndicator.getSlotProps(data)} />
            </MuiListItemIcon>
          )}

          <MuiListItemText
            {...{ primary, secondary }}
            primaryTypographyProps={{
              className: 'primary',
              variant: 'body1',
              color: 'textPrimary',
            }}
            secondaryTypographyProps={{
              className: 'secondary',
              variant: 'body2',
              color: 'textSecondary',
            }}
          />
        </MuiListItem>
      </MuiMenuItem>
    );
  });
}
