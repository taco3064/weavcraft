import _debounce from 'lodash/debounce';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import { useMemo, useState, useTransition } from 'react';
import type { DataBindingProp } from '@weavcraft/common';
import type { JsonObject } from 'type-fest';

import { usePropsDefinition } from '~web/contexts';
import type { RenderConfig } from '~web/hooks';
import type { WidgetType } from '~web/services';

import type {
  ConfigChangeHandler,
  DataFields,
  PropMappingItems,
  SourcePaths,
} from './PropsSettingTabs.types';

function useDataChangeHandler(
  config: RenderConfig,
  dataPath: SourcePaths['data'],
  onChange: ConfigChangeHandler
) {
  const { props = {} } = config;

  return (e: JsonObject | JsonObject[]) => {
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
  };
}

function useSourcePaths(widget: WidgetType) {
  const { getDefinition } = usePropsDefinition();

  return useMemo<SourcePaths>(() => {
    const { dataBindingProps = {} } = getDefinition(widget);
    const configs = Object.entries(dataBindingProps);

    const isRecordsCase = Boolean(
      configs.find(
        ([, { type, definition }]) =>
          type === 'data' && _get(definition, 'multiple')
      )
    );

    return {
      data: isRecordsCase ? 'records' : 'data',

      binding: configs.find(([path]) =>
        isRecordsCase ? path.endsWith('.propMapping') : path === 'propMapping'
      )?.[0] as SourcePaths['binding'],
    };
  }, [widget, getDefinition]);
}

export function useDataCreate(
  widget: WidgetType,
  basePropPath: string,
  bindingFields: Record<string, string>
) {
  const { getDefinition } = usePropsDefinition();
  const stringify = JSON.stringify(bindingFields);

  return useMemo(() => {
    const { elementNodeProps, primitiveValueProps } = getDefinition(widget);

    const bindingFields: Record<string, string> = JSON.parse(stringify);
    const props = { ...elementNodeProps, ...primitiveValueProps };

    const result = Object.entries(bindingFields).reduce<DataFields>(
      (acc, [propPath, fieldName]) => {
        const path = basePropPath ? `${basePropPath}.${propPath}` : propPath;
        const { [path]: propTypes } = props;

        return {
          ...acc,
          ...(fieldName &&
            propTypes && {
              [fieldName]:
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

export function useFixedData(
  config: RenderConfig,
  onChange: ConfigChangeHandler
) {
  const { widget, props = {} } = config;
  const sourcePaths = useSourcePaths(widget);
  const handleChange = useDataChangeHandler(config, sourcePaths.data, onChange);

  const bindingFields = (_get(props, [sourcePaths.binding, 'value']) ||
    {}) as Record<string, string>;

  return {
    basePropPath: sourcePaths.binding.replace(/\.?propMapping$/, ''),
    bindingFields,
    disabled: _isEmpty(bindingFields),
    data: _get(props, [sourcePaths.data, 'value']) as JsonObject | JsonObject[],

    handleChange: {
      create: (data: JsonObject) => {
        if (sourcePaths.data === 'data') {
          handleChange(data);
        } else {
          const value = (_get(props, [sourcePaths.data, 'value']) ||
            []) as JsonObject[];

          value.push(data);
          handleChange(value);
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
          handleChange(value);
        }
      },
      update: (data: JsonObject, index?: number) => {
        if (sourcePaths.data === 'data') {
          handleChange(data);
        } else if (typeof index === 'number') {
          const value = (_get(props, [sourcePaths.data, 'value']) ||
            []) as JsonObject[];

          value.splice(index, 1, data);
          handleChange(value);
        }
      },
    },
  };
}

export function usePropMapping(
  config: RenderConfig,
  onChange: ConfigChangeHandler
) {
  const [, startTransition] = useTransition();
  const [invalid, setInvalid] = useState<Record<string, string[]>>(() => ({}));

  const { widget, props = {} } = config;
  const { getDefinition } = usePropsDefinition();

  const sourcePaths = useSourcePaths(widget);
  const handleChange = useDataChangeHandler(config, sourcePaths.data, onChange);

  const debouncedRefreshData = useMemo(() => {
    const refreshData = (fieldPaths: string[], data: JsonObject) =>
      fieldPaths.reduce<JsonObject>((result, path) => {
        const value = _get(data, path);

        return !value ? result : _set(result, path, value);
      }, {});

    return _debounce((mapping: Record<string, string>) => {
      const fieldPaths = [...new Set(Object.values(mapping))];

      if (sourcePaths.data === 'data') {
        const data = _get(props, [sourcePaths.data, 'value']) as JsonObject;

        handleChange(refreshData(fieldPaths, data));
      } else {
        const records = (_get(props, [sourcePaths.data, 'value']) ||
          []) as JsonObject[];

        handleChange(records.map((data) => refreshData(fieldPaths, data)));
      }
    }, 200);
  }, [sourcePaths.data, props, handleChange]);

  return {
    invalid,

    groups: useMemo(() => {
      const {
        dataBindingProps = {},
        elementNodeProps,
        primitiveValueProps,
      } = getDefinition(widget);

      const props = { ...elementNodeProps, ...primitiveValueProps };

      const result = Object.entries(dataBindingProps).reduce<PropMappingItems>(
        (acc, [mappingPath, { type, definition }]) => {
          const base = mappingPath.replace(/\.?propMapping$/, '');
          const basePath = base ? `${base}.` : '';

          return {
            ...acc,
            ...(type === 'mapping' && {
              [mappingPath]:
                (definition as string[])
                  ?.map((propPath) => {
                    const type = _get(props, [
                      `${basePath}${propPath}`,
                      'type',
                    ]);

                    return {
                      propPath,
                      type: type === 'node' ? 'string' : type,
                    };
                  })
                  .sort(({ propPath: p1 }, { propPath: p2 }) =>
                    p1.localeCompare(p2)
                  ) || [],
            }),
          };
        },
        {}
      );

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

        const conflicts = Object.keys(value).filter(
          (propPath) => value[propPath] === fieldName
        );

        if (conflicts.length) {
          _set(invalid, [mappingPath], [propName, ...conflicts]);
        } else {
          _unset(invalid, [mappingPath]);
        }

        if (fieldName.trim() && !conflicts.length) {
          _set(value, [propName], fieldName.trim());
        } else {
          _unset(value, [propName]);
        }

        setInvalid({ ...invalid });
        onChange(config, mappingPath, { type: 'DataBinding', value });
        debouncedRefreshData(value);
      }),
  };
}
