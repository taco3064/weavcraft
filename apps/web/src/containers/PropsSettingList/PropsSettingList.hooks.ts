import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';
import _toPath from 'lodash/toPath';
import _unset from 'lodash/unset';
import type { JsonObject } from 'type-fest';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from 'react';

import { DataPropEnum, useNodeFinder } from '~web/hooks';
import { SettingModeEnum, SourceModeEnum } from './PropsSettingList.types';
import { useCorePropsGetter } from '~web/contexts';

import type {
  BindingSelectProps,
  DataFieldIndexes,
  DataSourceOptions,
  DataSource,
  PropItemProps,
  PropsSettingListProps,
  SourceSelectProps,
} from './PropsSettingList.types';

import type {
  DataFields,
  GetCorePropsFn,
  MappingPath,
  ComponentConfig,
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
    _get(parentNode, ['node', 'props', 'propMapping', 'value', 'records']) || []
  );

  const hasFixedRecords = Boolean(
    _get(parentNode, ['node', 'props', 'records', 'value'])
  );

  return useMemo<{
    isExtensionAllowed: boolean;
    recordsOptions?: {
      root: DataSourceOptions<string[]>[];
      extension: DataSourceOptions<string[]>[];
    };
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
  const [, baseName] = _toPath(propPath).reverse();

  const { getParentStoreNode } = useNodeFinder();
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
  } else if (dataSource === '[[extension]]') {
    const parentNode = getParentStoreNode(widget, paths);
    const records: JsonObject[] =
      _get(parentNode, ['node', 'props', 'records', 'value']) || [];
    const fixedFields = new Set(
      records.map((data) => Object.keys(data)).flat()
    );

    const dataFieldIndexes: DataFieldIndexes =
      _get(parentNode, ['node', 'props', 'propMapping', 'value', 'records']) ||
      [];

    return fixedFields.size
      ? Array.from(fixedFields).map<{ fieldPath: string; indexes?: undefined }>(
          (fieldPath) => ({ fieldPath })
        )
      : getSourceOptions(
          DataPropEnum.Data,
          _get(dataStructure, dataFieldIndexes),
          dataFieldIndexes
        );
  }

  const indexes = baseName ? dataSource : dataSource?.slice(0, -2);

  return getSourceOptions(
    DataPropEnum.Data,
    (!indexes?.length ? dataStructure : _get(dataStructure, indexes)) || [],
    indexes
  );
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
        !value || typeof value === 'string' ? value : JSON.stringify(value),
      [value]
    ),

    (e: ChangeEvent<HTMLInputElement>) =>
      onChange(
        propName,
        !e.target.value || /[a-z]/.test(e.target.value)
          ? e.target.value
          : JSON.parse(e.target.value)
      ),
  ] as const;
}

export function useInjectionHandler({
  config,
  onChange,
}: Pick<PropsSettingListProps, 'config' | 'onChange'>) {
  const getCoreProps = useCorePropsGetter();

  const resetPropMapping = useCallback(
    (config: ComponentConfig, data?: JsonObject | JsonObject[]) => {
      const { isStoreWidget } = getCoreProps(config.component);

      const { [isStoreWidget ? 'Records' : 'Data']: dataPropName } =
        DataPropEnum;

      resetAllPropMapping(config, { forceReset: true, getCoreProps });

      if (data) {
        _set(config, ['props', dataPropName], {
          type: 'DataBinding',
          value: data,
        });
      } else {
        _unset(config, ['props', dataPropName, 'value']);
      }
    },
    [getCoreProps]
  );

  return {
    onFieldBinding: (
      mappingPath: MappingPath,
      propName: string,
      source?: DataSource
    ) => {
      if (propName === DataPropEnum.Records || propName === DataPropEnum.Data) {
        resetPropMapping(config);
      }

      const mapping: Record<string, string> =
        _get(config, ['props', mappingPath, 'value']) || {};

      if (source) {
        _set(mapping, [propName], source);
      } else {
        _unset(mapping, [propName]);
      }

      onChange(
        config,
        mappingPath,
        _isEmpty(mapping) ? undefined : { type: 'DataBinding', value: mapping }
      );
    },
    onFixedDataChange: (data?: JsonObject | JsonObject[]) => {
      const { definition, isStoreWidget, mappingPaths } = getCoreProps(
        config.component
      );

      const mappingPath = mappingPaths.find((path) =>
        isStoreWidget ? path.endsWith('.propMapping') : path === 'propMapping'
      ) as MappingPath;

      const propNames: string[] =
        _get(definition, ['dataBindingProps', mappingPath, 'definition']) || [];

      resetPropMapping(config, data);

      onChange(config, mappingPath, {
        type: 'DataBinding',
        value: Object.fromEntries(
          propNames.map((propName) => [propName, propName])
        ),
      });
    },
  };
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

function resetAllPropMapping(
  { component, props = {} }: ComponentConfig,
  {
    forceReset = false,
    getCoreProps,
  }: { forceReset?: boolean; getCoreProps: GetCorePropsFn }
) {
  const { definition, isStoreWidget, mappingPaths } = getCoreProps(component);
  const { elementNodeProps } = definition;
  const { [isStoreWidget ? 'Records' : 'Data']: dataPropName } = DataPropEnum;

  const dataSource = _get(props, [dataPropName, 'value']) as DataSource;

  if (
    forceReset ||
    !dataSource ||
    dataSource === '[[extension]]' ||
    (Array.isArray(dataSource) && dataSource.length >= 3)
  ) {
    const children = Object.keys(elementNodeProps || {})
      .map((path) => (_get(props, [path, 'value']) || []) as ComponentConfig[])
      .flat();

    mappingPaths.forEach((mappingPath) => _unset(props, [mappingPath]));
    children.forEach((node) => resetAllPropMapping(node, { getCoreProps }));
  }
}

function getSourceOptions(
  type: DataPropEnum,
  dataStructure: DataFields,
  baseIndexes: DataFieldIndexes = []
) {
  return dataStructure.reduce<DataSourceOptions[]>((acc, field, i) => {
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
  }, []);
}
