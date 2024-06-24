import _debounce from 'lodash/debounce';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import type { JsonObject } from 'type-fest';

import { useCorePropsGetter } from '~web/contexts';
import type { RenderConfig } from '../useWidgetRender';

import type {
  DataChangeHandler,
  PropsSettingChangeHandler,
} from './useDataStructure.types';

export function useDataBindingHandler(
  config: RenderConfig,
  onChange: PropsSettingChangeHandler
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
