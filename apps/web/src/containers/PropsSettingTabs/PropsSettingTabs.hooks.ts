import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import { useMemo } from 'react';
import type { DataBindingProp } from '@weavcraft/common';
import type { JsonObject } from 'type-fest';

import { usePropsDefinition } from '~web/contexts';
import type { PropTypeDefinitions, WidgetType } from '~web/services';
import type { RenderConfig } from '~web/hooks';

import type {
  ConfigChangeHandler,
  DataField,
  SourcePaths,
} from './PropsSettingTabs.types';

export function useDataCreate(
  widget: WidgetType,
  bindingFields: Record<string, string>
) {
  const { getDefinition } = usePropsDefinition();
  const stringify = JSON.stringify(bindingFields);

  return useMemo(() => {
    const { primitiveValueProps = {} } = getDefinition(widget) || {};
    const bindingFields: Record<string, string> = JSON.parse(stringify);

    return Object.entries(bindingFields).reduce<DataField>(
      (acc, [propPath, fieldName]) => {
        const { [propPath]: propTypes } = primitiveValueProps;

        return {
          ...acc,
          ...(fieldName &&
            propTypes && {
              [fieldName]: propTypes,
            }),
        };
      },
      {}
    );
  }, [widget, stringify, getDefinition]);
}

export function useFixedData(
  config: RenderConfig,
  onChange: ConfigChangeHandler<DataBindingProp>
) {
  const { widget, props = {} } = config;
  const { getDefinition } = usePropsDefinition();

  const sourcePaths = useMemo<SourcePaths>(() => {
    const { dataBindingProps = {} } = getDefinition(widget) || {};
    const configs = Object.entries(dataBindingProps);

    const isRecordsCase = Boolean(
      configs.find(
        ([, { type, definition }]) =>
          type === 'data' && _get(definition, 'multiple')
      )
    );

    return {
      binding: configs.find(([path]) =>
        isRecordsCase ? path.endsWith('.propMapping') : path === 'propMapping'
      )?.[0] as SourcePaths['binding'],

      data: isRecordsCase ? 'records' : 'data',
    };
  }, [widget, getDefinition]);

  const bindingFields = (_get(props, [sourcePaths.binding, 'value']) ||
    {}) as Record<string, string>;

  return {
    bindingFields,
    disabled: _isEmpty(bindingFields),
    data: _get(props, [sourcePaths.data, 'value']) as JsonObject | JsonObject[],

    onDataChange: (e: JsonObject | number | undefined) => {
      if (sourcePaths.data === 'data') {
        if (e) {
          _set(props, [sourcePaths.data, 'value'], e);
        } else {
          _unset(props, [sourcePaths.data, 'value']);
        }

        onChange(config, sourcePaths.data, {
          type: 'DataBinding',
          value: _get(props, [sourcePaths.data, 'value']) as JsonObject,
        });
      } else {
        const value = (_get(props, [sourcePaths.data, 'value']) ||
          []) as JsonObject[];

        if (typeof e === 'number') {
          value.splice(e, 1);
        } else {
          value.push(e as JsonObject);
        }

        _set(props, [sourcePaths.data, 'value'], [...value]);
        onChange(config, sourcePaths.data, { type: 'DataBinding', value });
      }
    },
  };
}

export function usePropMapping(
  config: RenderConfig,
  onChange: ConfigChangeHandler<DataBindingProp>
) {
  const { widget, props = {} } = config;
  const { getDefinition } = usePropsDefinition();

  return {
    items: useMemo(() => {
      const { dataBindingProps = {} } = getDefinition(widget) || {};

      return Object.entries(dataBindingProps)
        .filter(([, { type }]) => type === 'mapping')
        .sort(([path1], [path2]) => path1.length - path2.length) as [
        string,
        PropTypeDefinitions.Mapping
      ][];
    }, [widget, getDefinition]),

    onMappingChange: (path: string, propName: string, input: string) => {
      const value = (_get(props, [path, 'value']) || {}) as Record<
        string,
        string
      >;

      if (input.trim()) {
        _set(value, [propName], input.trim());
      } else {
        _unset(value, [propName]);
      }

      onChange(config, path, { type: 'DataBinding', value });
    },
  };
}
