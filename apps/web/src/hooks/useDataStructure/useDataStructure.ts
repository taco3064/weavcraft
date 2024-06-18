import _debounce from 'lodash/debounce';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import { useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import type { JsonObject } from 'type-fest';

import { getBasePropPath, useCorePropsGetter } from '~web/contexts';
import { useWidgetNodePaths } from '../useWidgetRender';
import type { ConfigPaths, RenderConfig } from '../useWidgetRender';
import type { MappingPath, WidgetConfigs } from '../hooks.types';

import type {
  ConfigChangeHandler,
  DataChangeHandler,
  DataStructure,
  FieldDefinition,
  GeneratorOptions,
  ParentStoreNodeParams,
  ParentNode,
} from './useDataStructure.types';

function getDataStructure(
  config: RenderConfig,
  {
    baseFieldPath = [],
    children,
    conflicts = new Set<string>(),
    subFieldPath,
    getCoreProps,
  }: GeneratorOptions
) {
  const { widget, props = {} } = config;

  const { childrenBasePath, isStoreWidget, mappableProps, mappingPaths } =
    getCoreProps(widget);

  const mainDataStructure: DataStructure = {};
  const subDataStructure: DataStructure = {};

  //* - Step 1. Get by props definition.
  mappingPaths.forEach((mappingPath) => {
    const basePropPath = getBasePropPath(mappingPath);
    const mappings = Object.entries(_get(props, [mappingPath, 'value']) || {});

    (mappings as [string, string][]).forEach(([propName, fieldPath]) => {
      if (propName === 'records') {
        return;
      }

      const propPath = basePropPath ? `${basePropPath}.${propName}` : propName;
      const { type, required, definition } = mappableProps[propPath];

      const target =
        isStoreWidget && basePropPath ? subDataStructure : mainDataStructure;

      mergeDataStructure(target, fieldPath, {
        conflicts,
        required,
        baseFieldPath,
        ...(type !== 'node'
          ? { type, definition }
          : { type: 'string', definition: { multiple: true } }),
      });
    });
  });

  //* - Step 2. Get by children nodes.
  children.forEach(({ nodePath, ...childNode }) => {
    const isSubCase =
      isStoreWidget && nodePath.startsWith(`${childrenBasePath}.`);

    const target = isSubCase ? subDataStructure : mainDataStructure;

    const nodeStructure = getDataStructure(
      ...getGeneratorParams(childNode, {
        getCoreProps,
        conflicts,
        baseFieldPath: !isSubCase
          ? baseFieldPath
          : [...baseFieldPath, subFieldPath],
      })
    );

    Reflect.ownKeys(nodeStructure).forEach((fieldPath) => {
      const definition = nodeStructure[fieldPath];

      if (Array.isArray(definition)) {
        target[fieldPath as symbol] = definition;
      } else {
        mergeDataStructure(target, fieldPath as string, {
          ...definition,
          baseFieldPath,
          conflicts,
        });
      }
    });
  });

  if (!_isEmpty(subDataStructure)) {
    mainDataStructure[Symbol(`${subFieldPath}(${childrenBasePath})`)] = [
      subDataStructure,
    ];
  }

  return mainDataStructure;
}

function getGeneratorParams(
  config: RenderConfig,
  options: Pick<
    GeneratorOptions,
    'baseFieldPath' | 'conflicts' | 'getCoreProps'
  >
): [RenderConfig, GeneratorOptions] {
  const { widget, props = {} } = config;
  const { definition } = options.getCoreProps(widget);

  return [
    config,
    {
      ...options,
      subFieldPath: _get(props, ['propMapping', 'value', 'records']) || 'none',

      children: Object.keys(definition.elementNodeProps || {}).reduce<
        (RenderConfig & { nodePath: string })[]
      >((acc, nodePath) => {
        const node = _get(props, [nodePath, 'value']) || [];
        const nodes = (Array.isArray(node) ? node : [node]) as RenderConfig[];

        acc.push(...nodes.map((node) => ({ ...node, nodePath })));

        return acc;
      }, []),
    },
  ];
}

function getMappingPath(isStoreWidget: boolean, mappingPaths: MappingPath[]) {
  return mappingPaths.find(([path]) =>
    isStoreWidget ? path.endsWith('.propMapping') : path === 'propMapping'
  );
}

function getParentStoreNode(
  widget: WidgetConfigs,
  paths: ConfigPaths,
  { getCoreProps, getNode }: ParentStoreNodeParams
): ParentNode | null {
  if (!paths.length) {
    return null;
  }

  const isMultiple = typeof paths[paths.length - 1] === 'number';
  const popPaths = paths.slice(0, isMultiple ? -2 : -1);
  const node = getNode(widget, popPaths);
  const { childrenBasePath, isStoreWidget } = getCoreProps(node.widget);

  if (isStoreWidget) {
    const lastPath = paths[paths.length - (isMultiple ? 2 : 1)] as string;

    const subFieldPath: string =
      _get(node, ['props', 'propMapping', 'value', 'records']) || 'none';

    return {
      node,
      subFieldName: lastPath.startsWith(`${childrenBasePath}.`)
        ? `${subFieldPath}(${childrenBasePath})`
        : undefined,
    };
  }

  return getParentStoreNode(widget, popPaths, { getCoreProps, getNode });
}

function mergeDataStructure(
  target: DataStructure,
  fieldPath: string,
  {
    baseFieldPath,
    conflicts,
    ...field
  }: FieldDefinition &
    Required<Pick<GeneratorOptions, 'baseFieldPath' | 'conflicts'>>
) {
  const key = JSON.stringify([...baseFieldPath, fieldPath]);
  const exists = _get(target, [fieldPath]);
  const existsType = (Array.isArray(exists) ? exists[0] : exists)?.type;

  if (exists && existsType !== field.type) {
    conflicts.add(key);
    _unset(target, [fieldPath]);
  } else if (!conflicts.has(key)) {
    _set(target, [fieldPath], field);
  }
}

// /** @deprecated */
// export function useSourcePaths(widget: WidgetType) {
//   const getCoreProps = usePropsDefinitionGetter();

//   return useMemo<SourcePaths>(() => {
//     const { dataBindingProps } = getCoreProps(widget);
//     const { isStore, mappingPath } = getMappingInfo(dataBindingProps);

//     return {
//       data: isStore ? 'records' : 'data',
//       mapping: mappingPath,
//     };
//   }, [widget, getCoreProps]);
// }

export function useDataChange(
  config: RenderConfig,
  onChange: ConfigChangeHandler
) {
  const { widget, props = {} } = config;

  const getCoreProps = useCorePropsGetter();
  const handleRef = useRef<DataChangeHandler>();

  const dataPath = useMemo(() => {
    const { isStoreWidget } = getCoreProps(widget);

    return isStoreWidget ? 'records' : 'data';
  }, [widget, getCoreProps]);

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

export function useDataStructure(widget: WidgetConfigs) {
  const { getNode } = useWidgetNodePaths();
  const getCoreProps = useCorePropsGetter();

  return {
    getCompleteStructure: () =>
      getDataStructure(...getGeneratorParams(widget, { getCoreProps })),

    getFieldStructure: (config: RenderConfig, paths: ConfigPaths) => {
      const { node, subFieldName } = getParentStoreNode(widget, paths, {
        getCoreProps,
        getNode,
      }) || { node: config };

      const structure = getDataStructure(
        ...getGeneratorParams(node, { getCoreProps })
      );

      const fieldName = Reflect.ownKeys(structure).find(
        (key) => typeof key === 'symbol' && key.description === subFieldName
      ) as symbol;

      return !fieldName ? structure : structure[fieldName][0];
    },
  };
}
