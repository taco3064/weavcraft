import _debounce from 'lodash/debounce';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import type { JsonObject } from 'type-fest';

import { useCorePropsGetter } from '~web/contexts';
import { useNodeFinder } from '../useNodeFinder';
import type { ConfigPaths, RenderConfig } from '../useWidgetRender';
import type { GetDefinitionFn, WidgetConfigs } from '../imports.types';

import type {
  DataChangeHandler,
  DataFields,
  DataSourceOptions,
  PropsSettingChangeHandler,
} from './useDataStructure.types';

export function useBindingSources(
  widget: WidgetConfigs,
  config: RenderConfig,
  paths: ConfigPaths
) {
  const getCoreProps = useCorePropsGetter();
  const { getAllParentStoreNodes } = useNodeFinder();

  const { dataStructure = [] } = widget;
  const { isStoreWidget, mappingPaths } = getCoreProps(config.widget);
  const parentStoreNodes = getAllParentStoreNodes(widget, paths);

  /**
   * TODO - 轉出資料來源選項
   * ? mappingPaths 是空的
   * * - 代表不能進行資料綁定，直接返回空陣列
   *
   * ? isStoreWidget 是 false
   * * - 代表是一般元件，選項結果如下：
   * * - 1. root
   * * - 2. extends
   *
   * ? isStoreWidget 是 true
   * * - 代表是 Store 元件，選項結果如下：
   * * - 1. isolated: dataStructure root 層下所有的結構欄位
   * * - 2. extends: 從 parentStoreNodes 中找到第一個有設置 records binding 的組件，
   * *      並取得其 source structure 層下所有的結構欄位
   * * - 3. 將上述結果以 Group Menu Item 的方式呈現
   */

  const isolatedOpts = getSourceOptions(dataStructure, config, getCoreProps);

  console.log(isolatedOpts);

  return [];
}

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

function getSourceOptions(
  dataStructure: DataFields,
  config: RenderConfig,
  getCoreProps: GetDefinitionFn
): DataSourceOptions[] {
  const { isStoreWidget, mappingPaths } = getCoreProps(config.widget);

  if (!mappingPaths.length) {
    return [];
  } else if (!isStoreWidget) {
    return [{ fieldPath: 'root', indexes: 'root' }];
  }

  return dataStructure.reduce<DataSourceOptions[]>((acc, field, i) => {
    const [fieldPath, structure] = Array.isArray(field) ? field : [field];

    if (isStoreWidget && Array.isArray(structure)) {
      acc.push({ fieldPath, indexes: `${i}` });
    }

    return acc;
  }, []);
}
