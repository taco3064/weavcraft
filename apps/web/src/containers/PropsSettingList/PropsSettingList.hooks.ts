import _get from 'lodash/get';
import _set from 'lodash/set';
import _toPath from 'lodash/toPath';
import _unset from 'lodash/unset';
import { useMemo, type ChangeEvent } from 'react';

import { DataPropNameEnum } from './PropsSettingList.types';
import { useCorePropsGetter } from '~web/contexts';
import { useNodeFinder } from '~web/hooks';
import type { DataFields, MappingPath } from '../imports.types';

import type {
  BindingSelectProps,
  DataFieldIndexes,
  DataSourceOptions,
  DataSource,
  PropsSettingListProps,
  SourceSelectProps,
} from './PropsSettingList.types';

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

  const dataSource: DataSource = _get(config, [
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

  const indexes = baseName ? dataSource : dataSource?.slice(0, -2);

  return getSourceOptions(
    DataPropNameEnum.Data,
    (!indexes?.length ? dataStructure : _get(dataStructure, indexes)) || [],
    indexes
  );
}

export function useFieldBindingHandler({
  config,
  onChange,
}: Pick<PropsSettingListProps, 'config' | 'onChange'>) {
  const getCoreProps = useCorePropsGetter();

  return (mappingPath: MappingPath, propName: string, source?: DataSource) => {
    const mapping = (_get(config, ['props', mappingPath, 'value']) ||
      {}) as Record<string, string>;

    if (source) {
      _set(mapping, [propName], source);
    } else {
      _unset(mapping, [propName]);
    }

    onChange(config, mappingPath, { type: 'DataBinding', value: mapping });
  };
}

export function useIndexesValue<
  N extends DataPropNameEnum | string,
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
