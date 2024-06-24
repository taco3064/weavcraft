import _get from 'lodash/get';
import _set from 'lodash/set';
import _toPath from 'lodash/toPath';
import _unset from 'lodash/unset';
import { useMemo, type ChangeEvent } from 'react';
import type { Get } from 'type-fest';
import type { PrimitiveValueProp } from '@weavcraft/common';

import { DataPropNameEnum } from './PropsSettingList.types';
import { useCorePropsGetter } from '~web/contexts';
import { useDataBindingHandler, useNodeFinder } from '~web/hooks';
import type {
  DataFields,
  DataSourceValue,
  MappingPath,
} from '../imports.types';

import type {
  BindingSelectProps,
  DataFieldIndexes,
  DataSourceOptions,
  PropItemProps,
  PropsSettingListProps,
} from './PropsSettingList.types';

export function useDataSourceOptions(
  dataPropName: DataPropNameEnum,
  { paths, widget }: Pick<PropsSettingListProps, 'paths' | 'widget'>
) {
  const { getParentStoreNode } = useNodeFinder();
  const { dataStructure = [] } = widget;
  const parentNode = getParentStoreNode(widget, paths);

  const extensionIndexes: DataFieldIndexes =
    _get(parentNode, ['node', 'props', 'propMapping', 'value', 'records']) ||
    [];

  return {
    isExtensionAllowed: Boolean(extensionIndexes.length),

    recordsOptions:
      dataPropName !== DataPropNameEnum.Records
        ? undefined
        : {
            root: getSourceOptions(dataPropName, dataStructure),
            extension: getSourceOptions(
              dataPropName,
              (_get(dataStructure, extensionIndexes) || []) as DataFields,
              extensionIndexes
            ),
          },
  };
}

export function useFieldBindingOptions({
  widget,
  config,
  paths,
  propPath,
}: Pick<BindingSelectProps, 'config' | 'paths' | 'propPath' | 'widget'>) {
  const getCoreProps = useCorePropsGetter();
  const [, baseName] = _toPath(propPath).reverse();

  const { getParentStoreNode } = useNodeFinder();
  const { dataStructure = [] } = widget;
  const { isStoreWidget } = getCoreProps(config.widget);

  const dataSource: DataSourceValue = _get(config, [
    'props',
    'propMapping',
    'value',
    isStoreWidget ? 'records' : 'data',
  ]);

  if (dataSource === '[[root]]') {
    return getSourceOptions(DataPropNameEnum.Data, dataStructure);
  } else if (dataSource === '[[extension]]') {
    const parentNode = getParentStoreNode(widget, paths);

    const dataFieldIndexes: DataFieldIndexes =
      _get(parentNode, ['node', 'props', 'propMapping', 'value', 'records']) ||
      [];

    return getSourceOptions(
      DataPropNameEnum.Data,
      _get(dataStructure, dataFieldIndexes),
      dataFieldIndexes
    );
  }

  const indexes = baseName ? dataSource : dataSource.slice(0, -2);

  return getSourceOptions(
    DataPropNameEnum.Data,
    !indexes.length ? dataStructure : _get(dataStructure, indexes),
    indexes
  );
}

export function usePropItem({
  config,
  propPath,
}: Pick<PropItemProps, 'config' | 'propPath'>) {
  const getCoreProps = useCorePropsGetter();
  const { widget, props = {} } = config;

  const { bindable, bindingSourcePaths } = useMemo(() => {
    const [propName, baseName] = _toPath(propPath).reverse();

    const { definition } = getCoreProps(widget);
    const { dataBindingProps = {} } = definition;

    const mappingPath = (
      baseName ? `${baseName}.propMapping` : 'propMapping'
    ) as MappingPath;

    const mappingProps: string[] =
      _get(dataBindingProps || {}, [mappingPath, 'definition']) || [];

    return {
      bindable: mappingProps.includes(propName),
      bindingSourcePaths: [mappingPath, 'value', propName],
    };
  }, [propPath, widget, getCoreProps]);

  return {
    bindable,

    defaultPropValue: _get(config, ['props', propPath, 'value']) as Get<
      PrimitiveValueProp,
      ['value']
    >,

    dataFieldIndexes: _get(props, bindingSourcePaths) as
      | DataFieldIndexes
      | undefined,
  };
}

export function useSetting({
  config,
  onChange,
}: Pick<PropsSettingListProps, 'config' | 'onChange'>) {
  const { widget, props = {} } = config;

  const getCoreProps = useCorePropsGetter();
  const handleBinding = useDataBindingHandler(config, onChange);

  const { dataPropName, propItems } = useMemo(() => {
    const { definition, isStoreWidget } = getCoreProps(widget);
    const { dataBindingProps, primitiveValueProps } = definition;

    const dataPropName = isStoreWidget
      ? DataPropNameEnum.Records
      : DataPropNameEnum.Data;

    return {
      dataPropName: (dataBindingProps?.[dataPropName]
        ? dataPropName
        : undefined) as DataPropNameEnum,

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
    dataPropName,
    propItems,

    dataSourceIndexes: _get(props, [
      'propMapping',
      'value',
      dataPropName,
    ]) as DataSourceValue,

    onFieldBinding: (
      mappingPath: string,
      propName: string,
      source?: DataSourceValue
    ) => {
      const value = (_get(props, [mappingPath, 'value']) || {}) as Record<
        string,
        string
      >;

      if (source) {
        _set(value, [propName], source);
        propName === 'records' && handleBinding.change([]);
      } else {
        _unset(value, [propName]);
      }

      onChange(config, mappingPath, { type: 'DataBinding', value });
      handleBinding.debouncedRefresh(value);
    },
  };
}

export function useIndexesValue<
  N extends DataPropNameEnum | string,
  V extends DataSourceValue | DataFieldIndexes
>(
  propName: N,
  value: V | undefined,
  onChange: (propName: N, value?: V) => void
) {
  return [
    useMemo(
      () =>
        !value || typeof value === 'string' ? value : JSON.stringify(value),
      [value]
    ),

    (e: ChangeEvent<HTMLInputElement>) =>
      onChange(
        propName,
        !e.target.value || /^\[\[(root|extension)\]\]$/.test(e.target.value)
          ? e.target.value
          : JSON.parse(e.target.value)
      ),
  ] as const;
}

function getSourceOptions(
  type: DataPropNameEnum,
  dataStructure: DataFields,
  baseIndexes: DataFieldIndexes = []
) {
  return dataStructure.reduce<DataSourceOptions[]>((acc, field, i) => {
    const [fieldPath, structure] = Array.isArray(field) ? field : [field];

    const fieldType = Array.isArray(structure)
      ? DataPropNameEnum.Records
      : DataPropNameEnum.Data;

    if (type === fieldType) {
      const indexes = Array.isArray(structure)
        ? [...baseIndexes, i, 1]
        : [...baseIndexes, i];

      acc.push({ fieldPath, indexes });
    }

    return acc;
  }, []);
}
