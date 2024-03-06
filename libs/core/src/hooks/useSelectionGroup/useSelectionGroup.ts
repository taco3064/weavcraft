import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';

import type { GroupProps } from './useSelectionGroup.types';
import type { GenericData, MappableProps } from '../../types';

export function useMultipleSelectionGroup<D extends GenericData>({
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

export function useSingleSelectionGroup<D extends GenericData>({
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
