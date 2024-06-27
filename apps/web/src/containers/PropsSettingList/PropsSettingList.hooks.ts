import _get from 'lodash/get';
import _toPath from 'lodash/toPath';
import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import type { JsonObject } from 'type-fest';

import { SettingModeEnum, SourceModeEnum } from './PropsSettingList.types';
import { useCorePropsGetter } from '~web/contexts';

import {
  DataPropEnum,
  NodeCaseEnum,
  useNodeCaseGetter,
  useNodeFinder,
} from '~web/hooks';

import type {
  BindingSelectProps,
  DataSourceOptions,
  PropItemProps,
  SourceSelectProps,
} from './PropsSettingList.types';

import type {
  DataFieldIndexes,
  DataFields,
  DataSource,
  MappingPath,
} from '../imports.types';

export function useDataSourceOptions({
  dataPropName,
  paths,
  widget,
}: Pick<SourceSelectProps, 'dataPropName' | 'paths' | 'widget'>) {
  const { getParentStoreNode } = useNodeFinder();
  const { dataStructure = [] } = widget;
  const parentNode = getParentStoreNode(widget, paths);

  const stringify = JSON.stringify(
    _get(parentNode, ['props', 'propMapping', 'value', 'records']) || []
  );

  const hasFixedRecords = Boolean(
    _get(parentNode, ['props', 'records', 'value'])
  );

  return useMemo<{
    isExtensionAllowed: boolean;
    recordsOptions?: Record<
      'root' | 'extension',
      Required<DataSourceOptions<string[]>>[]
    >;
  }>(() => {
    const extensionIndexes: DataFieldIndexes = JSON.parse(stringify);
    const isExtensionAllowed = Boolean(extensionIndexes.length);

    if (dataPropName !== DataPropEnum.Records) {
      return { isExtensionAllowed: isExtensionAllowed || hasFixedRecords };
    }

    return {
      isExtensionAllowed,
      recordsOptions: {
        root: getSourceOptions(dataPropName, dataStructure).map(
          ({ fieldPath, indexes }) => ({
            fieldPath: [fieldPath],
            indexes,
          })
        ),
        extension: getSourceOptions(
          dataPropName,
          (_get(dataStructure, extensionIndexes) || []) as DataFields,
          extensionIndexes
        ).map(({ indexes }) => ({
          indexes,
          fieldPath: indexes.reduceRight<string[]>((acc, _index, i) => {
            const target = _get(dataStructure, indexes.slice(0, i));

            if (
              Array.isArray(target) &&
              target.length === 2 &&
              typeof target[0] === 'string' &&
              Array.isArray(target[1])
            ) {
              acc.unshift(target[0]);
            }

            return acc;
          }, []),
        })),
      },
    };
  }, [dataPropName, dataStructure, hasFixedRecords, stringify]);
}

export function useFieldBindingOptions({
  widget,
  config,
  paths,
  propPath,
}: Pick<BindingSelectProps, 'config' | 'paths' | 'propPath' | 'widget'>) {
  const getCoreProps = useCorePropsGetter();
  const getNodeCase = useNodeCaseGetter();
  const [, baseName] = _toPath(propPath).reverse();

  const { getParentNode } = useNodeFinder();
  const { dataStructure = [] } = widget;
  const { isStoreWidget } = getCoreProps(config.component);

  const dataSource: DataSource = _get(config, [
    'props',
    'propMapping',
    'value',
    isStoreWidget ? 'records' : 'data',
  ]);

  if (dataSource === '[[root]]') {
    return getSourceOptions(DataPropEnum.Data, dataStructure);
  } else if (dataSource !== '[[extension]]') {
    const indexes = baseName ? dataSource : dataSource?.slice(0, -2);

    return getSourceOptions(
      DataPropEnum.Data,
      (!indexes?.length ? dataStructure : _get(dataStructure, indexes)) || [],
      indexes
    );
  }

  const parentNode = getParentNode(
    widget,
    paths,
    (node) => getNodeCase(node) !== null
  );

  switch (getNodeCase(parentNode)) {
    case NodeCaseEnum.BindingRoot:
      return getSourceOptions(DataPropEnum.Data, dataStructure);

    case NodeCaseEnum.FixedData: {
      const fields = Object.keys(
        _get(parentNode, ['props', 'data', 'value']) || {}
      );

      return fields.map<DataSourceOptions>((fieldPath) => ({
        fieldPath,
      }));
    }
    case NodeCaseEnum.FixedRecords: {
      const records: JsonObject[] =
        _get(parentNode, ['props', 'records', 'value']) || [];

      const fixedFields = new Set(
        records.map((data) => Object.keys(data)).flat()
      );

      return Array.from(fixedFields).map<DataSourceOptions>((fieldPath) => ({
        fieldPath,
      }));
    }
    case NodeCaseEnum.StoreComponent: {
      const dataFieldIndexes: DataFieldIndexes =
        _get(parentNode, ['props', 'propMapping', 'value', 'records']) || [];

      return getSourceOptions(
        DataPropEnum.Data,
        _get(dataStructure, dataFieldIndexes),
        dataFieldIndexes
      );
    }
    default:
      return [];
  }
}

export function useIndexesValue<
  N extends DataPropEnum | string,
  V extends DataSource | DataFieldIndexes
>(
  propName: N,
  value: V | undefined,
  onChange: (propName: N, value?: V) => void
) {
  return [
    useMemo(
      () =>
        (!value || typeof value === 'string' ? value : JSON.stringify(value)) ??
        '',
      [value]
    ),

    (e: ChangeEvent<HTMLInputElement>) =>
      onChange(
        propName,
        !e.target.value || !/^\[\d+(,\s?\d+)*\]$/.test(e.target.value)
          ? e.target.value
          : JSON.parse(e.target.value)
      ),
  ] as const;
}

export function usePropItemStatus({
  config,
  propPath,
  sourceMode,
}: Pick<PropItemProps, 'config' | 'propPath' | 'sourceMode'>) {
  const getCoreProps = useCorePropsGetter();
  const { component } = config;
  const [mode, setMode] = useState(SettingModeEnum.DefaultValue);

  const { disabled, bindingSourcePaths } = useMemo(() => {
    const [propName, baseName] = _toPath(propPath).reverse();

    const { definition } = getCoreProps(component);
    const { dataBindingProps = {} } = definition;

    const mappingPath = (
      baseName ? `${baseName}.propMapping` : 'propMapping'
    ) as MappingPath;

    const mappingProps: string[] =
      _get(dataBindingProps || {}, [mappingPath, 'definition']) || [];

    return {
      bindingSourcePaths: ['props', mappingPath, 'value', propName],

      disabled:
        sourceMode !== SourceModeEnum.Binding ||
        !mappingProps.includes(propName),
    };
  }, [component, propPath, sourceMode, getCoreProps]);

  const dataFieldIndexes = _get(config, bindingSourcePaths) as
    | DataFieldIndexes
    | undefined;

  useEffect(() => {
    if (disabled || sourceMode !== SourceModeEnum.Binding) {
      setMode(SettingModeEnum.DefaultValue);
    } else if (sourceMode === SourceModeEnum.Binding && dataFieldIndexes) {
      setMode(SettingModeEnum.PropMapping);
    }
  }, [dataFieldIndexes, disabled, sourceMode]);

  return {
    mode,
    disabledModeSwitch: disabled,
    dataFieldIndexes,
    onModeChange: setMode,
  };
}

function getSourceOptions(
  type: DataPropEnum,
  dataStructure: DataFields,
  baseIndexes: DataFieldIndexes = []
) {
  return dataStructure.reduce<Required<DataSourceOptions>[]>(
    (acc, field, i) => {
      const [fieldPath, structure] = Array.isArray(field) ? field : [field];

      const fieldType = Array.isArray(structure)
        ? DataPropEnum.Records
        : DataPropEnum.Data;

      if (type === fieldType) {
        const indexes = Array.isArray(structure)
          ? [...baseIndexes, i, 1]
          : [...baseIndexes, i];

        acc.push({ fieldPath, indexes });
      }

      return acc;
    },
    []
  );
}
