import _get from 'lodash/get';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import { useMemo } from 'react';
import type { DataBindingProp } from '@weavcraft/common';

import { usePropsDefinition } from '~web/contexts';
import type { ConfigChangeHandler } from './PropsSettingTabs.types';
import type { RenderConfig } from '~web/hooks';

export function useDataBindingChangeEvent(
  config: RenderConfig,
  onChange: ConfigChangeHandler<DataBindingProp>
) {
  const { props = {} } = config;

  return (path: string, propName: string, input: string) => {
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
  };
}

export function useFixedData(config: RenderConfig) {
  const { widget, props = {} } = config;
  const { getDefinition } = usePropsDefinition();

  const { isRecordsCase, dataSource } = useMemo(() => {
    const { dataBindingProps = {} } = getDefinition(widget) || {};

    const isRecordsCase = Boolean(
      Object.values(dataBindingProps).find(
        ({ type, definition }) => type === 'data' && definition?.multiple
      )
    );

    return {
      isRecordsCase,

      dataSource: Object.keys(dataBindingProps).find((path) => {
        if (!isRecordsCase) {
          return path === 'propMapping';
        }

        return path !== 'propMapping';
      }) as string,
    };
  }, [widget, getDefinition]);
}
