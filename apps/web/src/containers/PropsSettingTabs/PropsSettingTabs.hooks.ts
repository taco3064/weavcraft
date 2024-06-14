import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import { useMemo, useState, useTransition } from 'react';
import type { JsonObject } from 'type-fest';

import { usePropsDefinitionGetter } from '~web/contexts';
import type { WidgetType } from '~web/services';

import {
  useDataChange,
  useDataStructure,
  useSourcePaths,
  useStructureNode,
} from '~web/hooks';

import type {
  DataFields,
  DataBindingProps,
  PropMappingItems,
} from './PropsSettingTabs.types';

export function useDataCreate(
  widget: WidgetType,
  basePropPath: string,
  bindingFields: Record<string, string>
) {
  const getDefinition = usePropsDefinitionGetter();
  const stringify = JSON.stringify(bindingFields);

  return useMemo(() => {
    const { elementNodeProps, primitiveValueProps } = getDefinition(widget);

    const bindingFields: Record<string, string> = JSON.parse(stringify);
    const props = { ...elementNodeProps, ...primitiveValueProps };

    const result = Object.entries(bindingFields).reduce<DataFields>(
      (acc, [propName, fieldPath]) => {
        const propPath = basePropPath
          ? `${basePropPath}.${propName}`
          : propName;

        const { [propPath]: propTypes } = props;

        return {
          ...acc,
          ...(fieldPath &&
            propTypes && {
              [fieldPath]:
                propTypes.type !== 'node'
                  ? propTypes
                  : {
                      ...propTypes,
                      type: 'string',
                      definition: { multiple: true },
                    },
            }),
        };
      },
      {}
    );

    return Object.entries(result).sort(([field1], [field2]) =>
      field1.localeCompare(field2)
    );
  }, [widget, basePropPath, stringify, getDefinition]);
}

export function useFixedData({
  config,
  onChange,
}: Pick<DataBindingProps, 'config' | 'onChange'>) {
  const { widget, props = {} } = config;

  const sourcePaths = useSourcePaths(widget);
  const modifyData = useDataChange(config, onChange);

  const bindingFields = (_get(props, [sourcePaths.mapping, 'value']) ||
    {}) as Record<string, string>;

  return {
    basePropPath: sourcePaths.mapping.replace(/\.?propMapping$/, ''),
    bindingFields,
    data: _get(props, [sourcePaths.data, 'value']) as JsonObject | JsonObject[],

    disabled:
      _isEmpty(bindingFields) ||
      !_isEmpty(_get(props, ['propMapping', 'value', 'records'])),

    handleChange: {
      create: (data: JsonObject) => {
        if (sourcePaths.data === 'data') {
          modifyData.change(data);
        } else {
          const value = (_get(props, [sourcePaths.data, 'value']) ||
            []) as JsonObject[];

          value.push(data);
          modifyData.change(value);
        }
      },
      delete: (index?: number) => {
        if (sourcePaths.data === 'data') {
          _unset(props, [sourcePaths.data]);
          onChange(config, sourcePaths.data);
        } else if (typeof index === 'number') {
          const value = (_get(props, [sourcePaths.data, 'value']) ||
            []) as JsonObject[];

          value.splice(index, 1);
          modifyData.change(value);
        }
      },
      update: (data: JsonObject, index?: number) => {
        if (sourcePaths.data === 'data') {
          modifyData.change(data);
        } else if (typeof index === 'number') {
          const value = (_get(props, [sourcePaths.data, 'value']) ||
            []) as JsonObject[];

          value.splice(index, 1, data);
          modifyData.change(value);
        }
      },
    },
  };
}

export function useMappingValidation({
  config,
  paths,
  widget,
}: Pick<DataBindingProps, 'config' | 'paths' | 'widget'>) {
  const [invalid, setInvalid] = useState<Record<string, string[]>>(() => ({}));

  const parentNode = useStructureNode(widget, paths, config);
  const grandNode = useStructureNode(widget, paths, parentNode);

  console.log(useDataStructure(parentNode));
  console.log(useDataStructure(grandNode, true));

  return {
    invalid,
  };
}

export function usePropMapping({
  config,
  onChange,
}: Pick<DataBindingProps, 'config' | 'onChange'>) {
  const { widget, props = {} } = config;

  const [, startTransition] = useTransition();

  const getDefinition = usePropsDefinitionGetter();
  const modifyData = useDataChange(config, onChange);

  return {
    groups: useMemo(() => {
      const { dataBindingProps, elementNodeProps, primitiveValueProps } =
        getDefinition(widget);

      const props = { ...elementNodeProps, ...primitiveValueProps };

      const result = Object.entries(
        dataBindingProps || {}
      ).reduce<PropMappingItems>((acc, [mappingPath, { type, definition }]) => {
        const base = mappingPath.replace(/\.?propMapping$/, '');
        const basePath = base ? `${base}.` : '';

        if (type === 'mapping' && Array.isArray(definition)) {
          acc[mappingPath] =
            definition
              .map((propPath) => {
                const type = _get(props, [`${basePath}${propPath}`, 'type']);

                return {
                  propPath,
                  type: type === 'node' ? 'string' : type,
                };
              })
              .sort(({ propPath: p1 }, { propPath: p2 }) =>
                p1.localeCompare(p2)
              ) || [];
        }

        return acc;
      }, {});

      return Object.entries(result).sort(
        ([path1], [path2]) => path1.length - path2.length
      );
    }, [widget, getDefinition]),

    onMappingChange: (
      mappingPath: string,
      propName: string,
      fieldName: string
    ) =>
      startTransition(() => {
        const value = (_get(props, [mappingPath, 'value']) || {}) as Record<
          string,
          string
        >;

        // TODO - Need to check validity of fieldName
        if (fieldName.trim()) {
          _set(value, [propName], fieldName.trim());
          propName === 'records' && modifyData.change([]);
        } else {
          _unset(value, [propName]);
        }

        onChange(config, mappingPath, { type: 'DataBinding', value });
        modifyData.debouncedRefresh(value);
      }),
  };
}
