import _get from 'lodash/get';
import _set from 'lodash/set';
import _toPath from 'lodash/toPath';
import _unset from 'lodash/unset';
import { useMemo } from 'react';
import type { Get } from 'type-fest';
import type { PrimitiveValueProp } from '@weavcraft/common';

import { useCorePropsGetter } from '~web/contexts';
import { useDataBindingHandler } from '~web/hooks';
import type { MappingPath } from '../imports.types';

import type {
  PropItemProps,
  PropsSettingListProps,
} from './PropsSettingList.types';

export function usePropItemOptions({
  config,
  propPath,
}: Pick<PropItemProps, 'config' | 'propPath'>) {
  const getCoreProps = useCorePropsGetter();
  const { widget, props = {} } = config;

  const { bindingSourcePaths, mappable } = useMemo(() => {
    const { baseChildPath, definition } = getCoreProps(widget);
    const { dataBindingProps = {} } = definition;

    const isChildProps = propPath.startsWith(`${baseChildPath}.`);

    const mappingPath = (
      isChildProps ? `${baseChildPath}.propMapping` : 'propMapping'
    ) as MappingPath;

    const mappingProps: string[] =
      _get(dataBindingProps || {}, [mappingPath, 'definition']) || [];

    const path = isChildProps
      ? propPath.replace(`${baseChildPath}.`, '')
      : propPath;

    return {
      bindingSourcePaths: [mappingPath, 'value', path],
      mappable: mappingProps.includes(path),
    };
  }, [propPath, widget, getCoreProps]);

  return {
    mappable,
    fieldPath: _get(props, bindingSourcePaths) as string | undefined,

    defaultPropValue: _get(config, ['props', propPath, 'value']) as Get<
      PrimitiveValueProp,
      ['value']
    >,
  };
}

export function useSettingOptions({
  config,
  onChange,
}: Pick<PropsSettingListProps, 'config' | 'onChange'>) {
  const { widget, props = {} } = config;

  const getCoreProps = useCorePropsGetter();
  const handleBinding = useDataBindingHandler(config, onChange);

  const { injectedPath, propItems } = useMemo(() => {
    const { definition, isStoreWidget } = getCoreProps(widget);
    const { dataBindingProps, primitiveValueProps } = definition;

    const injectionPath = isStoreWidget ? 'records' : 'data';

    return {
      injectedPath: (dataBindingProps?.[injectionPath]
        ? injectionPath
        : undefined) as 'records' | 'data',

      propItems: Object.entries(primitiveValueProps || {})
        .sort(([path1], [path2]) => {
          const paths1 = _toPath(path1);
          const paths2 = _toPath(path2);

          return paths1.length - paths2.length || path1.localeCompare(path2);
        })
        .map(([propPath, definition]) => ({
          propPath,
          definition,
        })),
    };
  }, [widget, getCoreProps]);

  return {
    dataSrcPath: _get(props, [injectedPath, 'value']) as string,
    injectedPath,
    propItems,

    onSourceBinding: (
      mappingPath: string,
      propName: string,
      fieldName?: string
    ) => {
      const value = (_get(props, [mappingPath, 'value']) || {}) as Record<
        string,
        string
      >;

      if (fieldName?.trim()) {
        _set(value, [propName], fieldName.trim());
        propName === 'records' && handleBinding.change([]);
      } else {
        _unset(value, [propName]);
      }

      onChange(config, mappingPath, { type: 'DataBinding', value });
      handleBinding.debouncedRefresh(value);
    },
  };
}
