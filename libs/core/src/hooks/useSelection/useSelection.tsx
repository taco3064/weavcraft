import MuiMenuItem from '@mui/material/MenuItem';
import MuiListItem from '@mui/material/ListItem';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import MuiListItemText from '@mui/material/ListItemText';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { useMemo, type ComponentType } from 'react';

import type { BaseSelectFieldProps, GroupProps } from './useSelection.types';
import type { BaseSlotProps, GenericData, MappableProps } from '../../types';

import {
  getProps,
  useSlotPropsTransformation,
} from '../usePropsTransformation';

export function useMultipleSelection<D extends GenericData>({
  name,
  optionProps,
  options,
  value,
  onChange,
}: GroupProps<'multiple', D, MappableProps<D, { value?: any }>>) {
  type GroupValue = NonNullable<typeof value>[number];

  return {
    selected: useMemo<boolean[]>(
      () =>
        options?.map((data) => {
          const { value: path } = optionProps?.propMapping || {};
          const optionValue = _get(data, path as string) as GroupValue;

          return value?.includes(optionValue) || false;
        }) || [],
      [optionProps?.propMapping, options, value]
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
  options,
  value,
  onChange,
}: GroupProps<'single', D, MappableProps<D, { value?: any }>>) {
  type GroupValue = NonNullable<typeof value>;

  return {
    selected: useMemo<boolean[]>(
      () =>
        options?.map((data) => {
          const { value: path } = optionProps?.propMapping || {};
          const optionValue = _get(data, path as string) as GroupValue;

          return value === optionValue;
        }) || [],
      [optionProps?.propMapping, options, value]
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
  T extends 'single' | 'multiple',
  D extends GenericData,
  I extends BaseSlotProps
>({ optionIndicator, optionProps, options }: BaseSelectFieldProps<T, D, I>) {
  const ItemIndicator = useSlotPropsTransformation(optionIndicator);

  return options?.map((item, i) => {
    const { disabled, primary, secondary, value } = getProps({
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
        <MuiListItem component="div">
          {!ItemIndicator.Slot ? null : (
            <MuiListItemIcon>
              <ItemIndicator.Slot {...ItemIndicator.getSlotProps(item)} />
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
