import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import { useMemo } from 'react';
import type { DataBindingProp } from '@weavcraft/common';

import { usePropsDefinition } from '~web/contexts';
import type { ConfigChangeHandler } from './PropsSettingTabs.types';
import type { PropTypeDefinitions } from '~web/services';
import type { RenderConfig } from '~web/hooks';

export function useFixedData(config: RenderConfig) {
  const { widget, props = {} } = config;
  const { getDefinition } = usePropsDefinition();

  const sourcePaths = useMemo(() => {
    const { dataBindingProps = {} } = getDefinition(widget) || {};
    const configs = Object.entries(dataBindingProps);

    const isRecordsCase = Boolean(
      configs.find(
        ([, { type, definition }]) =>
          type === 'data' && _get(definition, 'multiple')
      )
    );

    return {
      /**
       * * The source path of the binding,
       * * used to determine whether it has been set
       * * and whether the data content can be edited.
       */
      binding: configs.find(([path]) =>
        isRecordsCase ? path.endsWith('.propMapping') : path === 'propMapping'
      )?.[0] as string,

      /**
       * * The source path for storing data,
       * * the actual storage location in the data editing interface (data / records).
       */
      data: isRecordsCase ? 'records' : 'data',
    };
  }, [widget, getDefinition]);

  return {
    disabled: _isEmpty(_get(props, [sourcePaths.binding, 'value'])),
    data: _get(props, [sourcePaths.data, 'value']),
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
