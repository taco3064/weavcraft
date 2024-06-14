import _debounce from 'lodash/debounce';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import { useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import type { JsonObject } from 'type-fest';

import { usePropsDefinitionGetter, type GetDefinitionFn } from '~web/contexts';
import { useWidgetNodePaths } from '../useWidgetRender';
import type { ConfigPaths, RenderConfig } from '../useWidgetRender';

import type {
  DataBindingPropsWithPath,
  WidgetConfigs,
  WidgetType,
} from '~web/services';

import type {
  ConfigChangeHandler,
  DataChangeHandler,
  DataStructureGetterOptions,
  FieldDefinition,
  SourcePaths,
} from './useDataStructure.types';

function getDataStructure(
  getDefinition: GetDefinitionFn,
  {
    conflicts = new Set<string>(),
    isStore,
    mappingPath,
    props = {},
    widget,
  }: DataStructureGetterOptions
) {
  const { elementNodeProps, primitiveValueProps } = getDefinition(widget);
  const result: { [fieldPath: string]: FieldDefinition } = {};

  const modify = (fieldPath: string, field: FieldDefinition) => {
    const exists = _get(result, [fieldPath]);

    if (exists && exists.type !== field.type) {
      conflicts.add(fieldPath);
      _unset(result, [fieldPath]);
    } else if (!conflicts.has(fieldPath)) {
      _set(result, [fieldPath], field);
    }
  };

  //* - Step 1. Generate from the children nodes.
  if (!isStore || mappingPath !== 'propMapping') {
    Object.keys(elementNodeProps || {}).forEach((nodePath) => {
      const child = _get(props, [nodePath, 'value']) || [];

      const children = (
        Array.isArray(child) ? child : [child]
      ) as RenderConfig[];

      children
        .map((childNode) => {
          const { dataBindingProps } = getDefinition(childNode.widget);
          const { isStore } = getMappingCase(dataBindingProps);

          return Object.entries(
            getDataStructure(getDefinition, {
              ...childNode,
              conflicts,
              isStore,
              mappingPath: 'propMapping',
            })
          );
        })
        .flat()
        .forEach((el) => modify(...el));
    });
  }

  //* - Step 2. Generate from the mapping path.
  const definitions = { ...elementNodeProps, ...primitiveValueProps };
  const basePropPath = mappingPath.replace(/\.?propMapping$/, '');

  const mappings = Object.entries(
    _get(props, [mappingPath, 'value']) || {}
  ) as [string, string][];

  mappings.forEach(([propName, fieldPath]) => {
    const propPath = basePropPath ? `${basePropPath}.${propName}` : propName;

    if (propPath === 'records') {
      return modify(fieldPath, { required: false, type: 'records' });
    }

    const { type, required, definition } = definitions[propPath];

    if (type !== 'node') {
      modify(fieldPath, { type, required, definition });
    } else {
      modify(fieldPath, {
        type: 'string',
        required,
        definition: { multiple: true },
      });
    }
  });

  return result;
}

function getMappingCase(
  dataBindingProps?: DataBindingPropsWithPath['dataBindingProps']
): Pick<DataStructureGetterOptions, 'isStore' | 'mappingPath'> {
  const definitions = Object.entries(dataBindingProps || {});

  const isStore = definitions.some(
    ([, { type, definition }]) =>
      type === 'data' && _get(definition, 'multiple')
  );

  return {
    isStore,

    mappingPath: definitions.find(([path]) =>
      isStore ? path.endsWith('.propMapping') : path === 'propMapping'
    )?.[0] as SourcePaths['mapping'],
  };
}

export function useDataChange(
  config: RenderConfig,
  onChange: ConfigChangeHandler
) {
  const handleRef = useRef<DataChangeHandler>();

  const { widget, props = {} } = config;
  const { data: dataPath } = useSourcePaths(widget);

  useImperativeHandle(
    handleRef,
    () => (e) => {
      _set(props, [dataPath, 'value'], e);

      onChange(
        config,
        dataPath,
        Array.isArray(e) && !e.length
          ? undefined
          : {
              type: 'DataBinding',
              value: _get(props, [dataPath, 'value']) as typeof e,
            }
      );
    },
    [props, dataPath, onChange, config]
  );

  return {
    change: useCallback<DataChangeHandler>(
      (...e) => handleRef.current?.(...e),
      []
    ),
    debouncedRefresh: useMemo(() => {
      const refreshData = (fieldPaths: string[], data: JsonObject) =>
        fieldPaths.reduce<JsonObject>((result, path) => {
          const value = _get(data, path);

          return !value ? result : _set(result, path, value);
        }, {});

      return _debounce((mapping: Record<string, string>) => {
        const fieldPaths = [...new Set(Object.values(mapping))];
        const target = _get(props, [dataPath, 'value']);

        if (target && handleRef.current) {
          if (dataPath === 'data') {
            const data = target as JsonObject;

            handleRef.current(refreshData(fieldPaths, data));
          } else {
            const records = target as JsonObject[];

            handleRef.current(
              records.map((data) => refreshData(fieldPaths, data))
            );
          }
        }
      }, 200);
    }, [dataPath, props]),
  };
}

export function useSourcePaths(widget: WidgetType) {
  const getDefinition = usePropsDefinitionGetter();

  return useMemo<SourcePaths>(() => {
    const { dataBindingProps } = getDefinition(widget);
    const { isStore, mappingPath } = getMappingCase(dataBindingProps);

    return {
      data: isStore ? 'records' : 'data',
      mapping: mappingPath,
    };
  }, [widget, getDefinition]);
}

export function useStructureNode(
  widget: WidgetConfigs,
  paths: ConfigPaths,
  config: RenderConfig
) {
  const { getNodePaths } = useWidgetNodePaths();

  const stringify = JSON.stringify(paths);
  const getDefinition = usePropsDefinitionGetter();

  return (
    useMemo<RenderConfig | null>(() => {
      let paths: ConfigPaths = JSON.parse(stringify);

      while (paths.length) {
        const isMultiple = typeof paths[paths.length - 1] === 'number';
        const popPaths = paths.slice(0, isMultiple ? -2 : -1);

        const node = (
          !popPaths.length ? widget : _get(widget, getNodePaths(popPaths))
        ) as RenderConfig;

        const { dataBindingProps } = getDefinition(node.widget);
        const { isStore } = getMappingCase(dataBindingProps);

        if (isStore) {
          return node;
        }

        paths = popPaths;
      }

      return null;
    }, [widget, stringify, getDefinition, getNodePaths]) || config
  );
}

export function useDataStructure(node: RenderConfig, forceMappingPath = false) {
  const getDefinition = usePropsDefinitionGetter();
  const { dataBindingProps } = getDefinition(node.widget);
  const { isStore, mappingPath } = getMappingCase(dataBindingProps);

  return getDataStructure(getDefinition, {
    ...node,
    isStore,
    mappingPath: forceMappingPath ? 'propMapping' : mappingPath,
  });
}
