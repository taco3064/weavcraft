import MuiMenuItem from '@mui/material/MenuItem';
import MuiListItem from '@mui/material/ListItem';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import MuiListItemText from '@mui/material/ListItemText';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';
import type { JsonObject, Paths } from 'type-fest';

import { usePropsGetter } from '../usePropsGetter';
import { useSlotElement } from '../useSlotElement';

import type {
  BaseSelectFieldProps,
  OptionProps,
  SelectionGroupProps,
  SelectionVariant,
} from './useSelection.types';

export function useMultipleSelection<
  D extends JsonObject,
  Path extends Extract<Paths<D>, string>,
  P
>({
  name,
  optionProps,
  records,
  value,
  onChange,
}: SelectionGroupProps<'multiple', D, Path, P>) {
  type GroupValue = NonNullable<typeof value>[number];
  const path = _get(optionProps, ['propMapping', 'value']) as string;

  return {
    selected: useMemo<boolean[]>(
      () =>
        records?.map((data) => {
          const optionValue = _get(data, path) as GroupValue;

          return value?.includes(optionValue) || false;
        }) || [],
      [path, records, value]
    ),

    onChange: (checked: boolean, data?: D) => {
      const optionValue = _get(data, path) as GroupValue;

      if (!_isEmpty(optionValue)) {
        const values = new Set<GroupValue>([...(value || [])]);

        values[checked ? 'add' : 'delete'](optionValue);
        onChange?.([...values], name);
      }
    },
  };
}

export function useSingleSelection<
  D extends JsonObject,
  Path extends Extract<Paths<D>, string>,
  P
>({
  name,
  optionProps,
  records,
  value,
  onChange,
}: SelectionGroupProps<'single', D, Path, P>) {
  type GroupValue = NonNullable<typeof value>;
  const path = _get(optionProps, ['propMapping', 'value']) as string;

  return {
    selected: useMemo<boolean[]>(
      () =>
        records?.map((data) => {
          const optionValue = _get(data, path) as GroupValue;

          return value === optionValue;
        }) || [],
      [path, records, value]
    ),

    onChange: (checked: boolean, data?: D) => {
      const optionValue = _get(data, path) as GroupValue;

      if (checked) {
        onChange?.(optionValue || undefined, name);
      }
    },
  };
}

export function useOptionsRender<
  V extends SelectionVariant,
  D extends JsonObject,
  Path extends Extract<Paths<D>, string>
>({ optionIndicator, optionProps, records }: BaseSelectFieldProps<V, D, Path>) {
  const ItemIndicator = useSlotElement(optionIndicator);
  const getProps = usePropsGetter<D>();

  return records?.map((data, i) => {
    const { disabled, primary, secondary, value } = getProps({
      ...(optionProps as OptionProps<D, NonNullable<typeof optionProps>, Path>),
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
