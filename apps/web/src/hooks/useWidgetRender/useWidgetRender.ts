import Core from '@weavcraft/core';
import _get from 'lodash/get';
import _set from 'lodash/set';
import type { ComponentType, ReactNode } from 'react';

import { usePropsDefinition } from '~web/contexts';

import type {
  GenerateOptions,
  RenderConfig,
  RenderFn,
} from './useWidgetRender.types';

export function useWidgetRender(render: RenderFn) {
  const { getDefinition } = usePropsDefinition();

  return function generate(
    config: RenderConfig,
    { key, paths = [] }: GenerateOptions = {}
  ) {
    const WidgetEl: ComponentType = _get(Core, config.widget);
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
          switch (type) {
            case 'ElementNode': {
              const nodes = Array.isArray(value) ? value : [value];

              const { multiple = false } =
                elementNodeProps?.[path]?.definition || {};

              const children: ReactNode[] = nodes.map((node, i) =>
                generate(node as RenderConfig, {
                  key: i,
                  paths: [...paths, path, ...(multiple ? [i] : [])],
                })
              );

              return _set(acc, path, multiple ? children : children[0]);
            }
            default:
              return _set(acc, path, value);
          }
        },
        {}
      ),
    });
  };
}
