import Core from '@weavcraft/core';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { useMemo } from 'react';
import type { ComponentType, ReactNode } from 'react';

import { usePropsDefinition } from '~web/contexts';

import type {
  ConfigPaths,
  GenerateOptions,
  RenderConfig,
  RenderFn,
} from './useWidget.types';

export function getWidgetNodePaths(paths: ConfigPaths) {
  return paths
    .map((path) => (typeof path === 'string' ? ['props', path, 'value'] : path))
    .flat();
}

export function usePathDescription(paths: ConfigPaths) {
  const stringify = JSON.stringify(paths);

  return useMemo(() => {
    const paths: ConfigPaths = JSON.parse(stringify);
    const lastIndex = paths.length - 1;
    const isMultiple = typeof paths[lastIndex] === 'number';

    return [
      paths[isMultiple ? lastIndex - 1 : lastIndex],
      !isMultiple ? '' : `[${paths[lastIndex]}]`,
    ].join('');
  }, [stringify]);
}

export function useWidgetNodePaths(paths: ConfigPaths) {
  return useMemo(() => getWidgetNodePaths(paths), [paths]);
}

export function useWidgetRender(render: RenderFn) {
  const { getDefinition } = usePropsDefinition();

  return function generate(
    config: RenderConfig,
    { key, paths = [] }: GenerateOptions = {}
  ) {
    const WidgetEl = _get(Core, config.widget) as ComponentType;
    const { elementNodeProps } = getDefinition(config.widget);

    return render(WidgetEl, {
      config,
      key,
      paths: paths
        .map((path) =>
          typeof path === 'string' ? ['props', path, 'value'] : path
        )
        .flat(),
      props: Object.entries(config.props || {}).reduce(
        (acc, [path, { type, value }]) => {
          if (type === 'ElementNode') {
            const nodes = Array.isArray(value) ? value : [value];

            const { multiple = false } =
              elementNodeProps?.[path]?.definition || {};

            const children: ReactNode[] = nodes.map((node, i) =>
              generate(node as RenderConfig, {
                key: i,
                paths: [...paths, path, ...(multiple ? [i] : [])],
              })
            );

            _set(acc, path, multiple ? children : children[0]);
          } else {
            _set(acc, path, value);
          }

          return acc;
        },
        {}
      ),
    });
  };
}
