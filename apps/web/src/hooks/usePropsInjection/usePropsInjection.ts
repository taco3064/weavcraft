import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import { useCallback, useMemo } from 'react';
import type { JsonObject } from 'type-fest';

import { DataPropEnum, NodeCaseEnum } from './usePropsInjection.types';
import { useNodeFinder } from '../useNodeActions';
import type { ComponentConfig } from '../useWidgetRender';

import {
  useCorePropsGetter,
  type MappingPath,
} from '../useCoreDefinitionContext';

import type {
  DataSource,
  PropsSettingChangeHandler,
  ResetPropMappingOptions,
} from './usePropsInjection.types';

export function useDataPropName({ component }: ComponentConfig) {
  const getCoreProps = useCorePropsGetter();

  return useMemo<DataPropEnum | undefined>(() => {
    const { definition, isStoreWidget } = getCoreProps(component);
    const { dataBindingProps } = definition;

    const dataPropName = isStoreWidget
      ? DataPropEnum.Records
      : DataPropEnum.Data;

    return dataBindingProps?.[dataPropName] ? dataPropName : undefined;
  }, [component, getCoreProps]);
}

export function useInjectionHandler(
  config: ComponentConfig,
  onChange: PropsSettingChangeHandler
) {
  const getCoreProps = useCorePropsGetter();
  const { getChildNodes } = useNodeFinder();

  const resetPropMapping = useCallback(
    (config: ComponentConfig, data?: JsonObject | JsonObject[]) => {
      const { isStoreWidget } = getCoreProps(config.component);

      const { [isStoreWidget ? 'Records' : 'Data']: dataPropName } =
        DataPropEnum;

      resetAllPropMapping(config, {
        forceReset: true,
        getCoreProps,
        getChildNodes,
      });

      if (data) {
        _set(config, ['props', dataPropName], {
          type: 'DataBinding',
          value: data,
        });
      } else {
        _unset(config, ['props', dataPropName, 'value']);
      }
    },
    [getCoreProps, getChildNodes]
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

export function useNodeCaseGetter() {
  const getCoreProps = useCorePropsGetter();

  return useCallback(
    (config?: ComponentConfig | null) => {
      if (config) {
        const { component, props } = config;
        const { isStoreWidget } = getCoreProps(component);

        if (_get(props, ['propMapping', 'value', 'data']) === '[[root]]') {
          return NodeCaseEnum.BindingRoot;
        }

        if (_get(props, ['data', 'value'])) {
          return NodeCaseEnum.FixedData;
        }

        if (_get(props, ['records', 'value'])) {
          return NodeCaseEnum.FixedRecords;
        }

        if (isStoreWidget) {
          return NodeCaseEnum.StoreComponent;
        }
      }

      return null;
    },
    [getCoreProps]
  );
}

function resetAllPropMapping(
  config: ComponentConfig,
  { forceReset = false, getChildNodes, getCoreProps }: ResetPropMappingOptions
) {
  const { component, props = {} } = config;
  const { isStoreWidget, mappingPaths } = getCoreProps(component);
  const { [isStoreWidget ? 'Records' : 'Data']: dataPropName } = DataPropEnum;

  const dataSource = _get(props, [dataPropName, 'value']) as DataSource;

  if (
    forceReset ||
    !dataSource ||
    dataSource === '[[extension]]' ||
    (Array.isArray(dataSource) && dataSource.length >= 3)
  ) {
    mappingPaths.forEach((mappingPath) => _unset(props, [mappingPath]));

    Object.values(getChildNodes(config)).forEach((node) =>
      resetAllPropMapping(node, { getChildNodes, getCoreProps })
    );
  }
}
