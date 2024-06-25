import _get from 'lodash/get';
import _set from 'lodash/set';
import _toPath from 'lodash/toPath';
import _unset from 'lodash/unset';
import { useMemo, type ChangeEvent } from 'react';

import { DataPropEnum } from './PropsSettingList.types';
import { useCorePropsGetter } from '~web/contexts';
import { useNodeFinder } from '~web/hooks';

import type {
  BindingSelectProps,
  DataFieldIndexes,
  DataSourceOptions,
  DataSource,
  PropsSettingListProps,
  SourceSelectProps,
} from './PropsSettingList.types';

import type {
  DataFields,
  GetDefinitionFn,
  MappingPath,
  RenderConfig,
} from '../imports.types';

export function useDataSourceOptions({
  dataPropName,
  paths,
  widget,
}: Pick<SourceSelectProps, 'dataPropName' | 'paths' | 'widget'>) {
  const { getParentStoreNode } = useNodeFinder();
  const { dataStructure = [] } = widget;
  const parentNode = getParentStoreNode(widget, paths);

  const extensionIndexes: DataFieldIndexes =
    _get(parentNode, ['node', 'props', 'propMapping', 'value', 'records']) ||
    [];

  return {
    isExtensionAllowed: Boolean(extensionIndexes.length),

    recordsOptions:
      dataPropName !== DataPropEnum.Records
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

export function useFieldBindingHandler({
  config,
  onChange,
}: Pick<PropsSettingListProps, 'config' | 'onChange'>) {
  const getCoreProps = useCorePropsGetter();

  return (mappingPath: MappingPath, propName: string, source?: DataSource) => {
    if (propName === DataPropEnum.Records || propName === DataPropEnum.Data) {
      const { isStoreWidget } = getCoreProps(config.widget);

      const { [isStoreWidget ? 'Records' : 'Data']: dataPropName } =
        DataPropEnum;

      _unset(config, ['props', dataPropName, 'value']);
      resetAllPropMapping(config, { forceReset: true, getCoreProps });
    }

    const mapping: Record<string, string> =
      _get(config, ['props', mappingPath, 'value']) || {};

    if (source) {
      _set(mapping, [propName], source);
    } else {
      _unset(mapping, [propName]);
    }

    onChange(config, mappingPath, { type: 'DataBinding', value: mapping });
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

    const dataFieldIndexes: DataFieldIndexes =
      _get(parentNode, ['node', 'props', 'propMapping', 'value', 'records']) ||
      [];

    return getSourceOptions(
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
        !e.target.value || /^\[\[(root|extension)\]\]$/.test(e.target.value)
          ? e.target.value
          : JSON.parse(e.target.value)
      ),
  ] as const;
}

function resetAllPropMapping(
  { widget, props = {} }: RenderConfig,
  {
    forceReset = false,
    getCoreProps,
  }: { forceReset?: boolean; getCoreProps: GetDefinitionFn }
) {
  const { definition, isStoreWidget, mappingPaths } = getCoreProps(widget);
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
      .map((path) => (_get(props, [path, 'value']) || []) as RenderConfig[])
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
