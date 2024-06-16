import _debounce from 'lodash/debounce';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import { useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import type { JsonObject } from 'type-fest';

import { usePropsDefinitionGetter } from '~web/contexts';
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
  DataStructure,
  FieldDefinition,
  GetDataStructureOptions,
  MappingInfo,
  ParentNode,
  SourcePaths,
} from './useDataStructure.types';

function getBasePropPath(path: string) {
  return path.replace(/\.?propMapping$/, '');
}

function getMappingInfo(
  dataBindingProps?: DataBindingPropsWithPath['dataBindingProps']
): MappingInfo {
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

function mergeDataStructure(
  target: DataStructure,
  fieldPath: string,
  {
    baseFieldPath,
    conflicts,
    ...field
  }: FieldDefinition &
    Required<Pick<GetDataStructureOptions, 'baseFieldPath' | 'conflicts'>>
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

function getDataStructure({
  baseFieldPath = [],
  conflicts = new Set<string>(),
  props = {},
  widget,
  getDefinition,
}: GetDataStructureOptions) {
  const result: DataStructure = {};
  const subStructure: DataStructure = {};

  //* - Step 1. Prepare the definition variables.
  const { dataBindingProps, elementNodeProps, primitiveValueProps } =
    getDefinition(widget);

  const subFieldPath: string =
    _get(props, ['propMapping', 'value', 'records']) || 'none';

  const { isStore } = getMappingInfo(dataBindingProps);

  const mappingPaths = Object.keys(dataBindingProps || {}).filter(
    (path) => _get(dataBindingProps, [path, 'type']) === 'mapping'
  ) as SourcePaths['mapping'][];

  const [childNodePath = ''] = mappingPaths
    .map(getBasePropPath)
    .filter(Boolean);

  //* - Step 2. Get by children nodes.
  const children = Object.keys(elementNodeProps || {}).reduce<
    (RenderConfig & { nodePath: string })[]
  >((acc, nodePath) => {
    const node = _get(props, [nodePath, 'value']) || [];
    const nodes = (Array.isArray(node) ? node : [node]) as RenderConfig[];

    acc.push(...nodes.map((node) => ({ ...node, nodePath })));

    return acc;
  }, []);

  children.forEach(({ nodePath, ...childNode }) => {
    const isSubCase = isStore && nodePath.startsWith(`${childNodePath}.`);
    const target = isSubCase ? subStructure : result;

    const childStructure = getDataStructure({
      ...childNode,
      conflicts,
      getDefinition,
      baseFieldPath: !isSubCase
        ? baseFieldPath
        : [...baseFieldPath, subFieldPath],
    });

    Reflect.ownKeys(childStructure).forEach((fieldPath) => {
      const definition = childStructure[fieldPath];

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

  //* - Step 3. Get by props definition.
  const definitions = { ...elementNodeProps, ...primitiveValueProps };

  mappingPaths.forEach((mappingPath) => {
    const basePropPath = getBasePropPath(mappingPath);
    const mappings = Object.entries(_get(props, [mappingPath, 'value']) || {});

    (mappings as [string, string][]).forEach(([propName, fieldPath]) => {
      if (propName === 'records') {
        return;
      }

      const propPath = basePropPath ? `${basePropPath}.${propName}` : propName;
      const target = isStore && basePropPath ? subStructure : result;
      const { type, required, definition } = definitions[propPath];

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

  if (!_isEmpty(subStructure)) {
    result[Symbol(`${subFieldPath}(${childNodePath})`)] = [subStructure];
  }

  return result;
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

export function useDataStructure(widget: WidgetConfigs) {
  const { getNodePaths } = useWidgetNodePaths();
  const getDefinition = usePropsDefinitionGetter();

  return {
    getCompleteStructure: () => getDataStructure({ ...widget, getDefinition }),

    getFieldStructure: (config: RenderConfig, paths: ConfigPaths) => {
      let parentNode: ParentNode = { node: config };
      let slicePaths: ConfigPaths = [...paths];

      while (slicePaths.length) {
        const isMultiple =
          typeof slicePaths[slicePaths.length - 1] === 'number';

        const popPaths = slicePaths.slice(0, isMultiple ? -2 : -1);

        const node = (
          !popPaths.length ? widget : _get(widget, getNodePaths(popPaths))
        ) as RenderConfig;

        const { dataBindingProps } = getDefinition(node.widget);
        const { isStore, mappingPath } = getMappingInfo(dataBindingProps);

        if (!isStore) {
          slicePaths = popPaths;
          continue;
        }

        const nodePath = getBasePropPath(mappingPath);

        const subFieldPath: string =
          _get(node, ['props', 'propMapping', 'value', 'records']) || 'none';

        const lathPath = slicePaths[
          slicePaths.length - (isMultiple ? 2 : 1)
        ] as string;

        parentNode = {
          node,
          recordsFieldName: lathPath.startsWith(`${nodePath}.`)
            ? `${subFieldPath}(${nodePath})`
            : undefined,
        };

        break;
      }

      const structure = getDataStructure({ ...parentNode.node, getDefinition });

      const fieldName = Reflect.ownKeys(structure).find(
        (key) =>
          typeof key === 'symbol' &&
          key.description === parentNode.recordsFieldName
      ) as symbol;

      return !fieldName ? structure : structure[fieldName][0];
    },
  };
}

export function useSourcePaths(widget: WidgetType) {
  const getDefinition = usePropsDefinitionGetter();

  return useMemo<SourcePaths>(() => {
    const { dataBindingProps } = getDefinition(widget);
    const { isStore, mappingPath } = getMappingInfo(dataBindingProps);

    return {
      data: isStore ? 'records' : 'data',
      mapping: mappingPath,
    };
  }, [widget, getDefinition]);
}
