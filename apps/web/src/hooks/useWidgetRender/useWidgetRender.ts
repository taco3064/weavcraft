import Core from '@weavcraft/core';
import _get from 'lodash/get';
import _set from 'lodash/set';
import type { ComponentType, ReactNode } from 'react';

import { usePropsDefinition } from '~web/contexts';
import type { RenderConfig, RenderFn } from './useWidgetRender.types';

export function useWidgetRender(render: RenderFn) {
  const { getDefinition } = usePropsDefinition();

  return function generate(config: RenderConfig, key?: number) {
    const WidgetEl: ComponentType = _get(Core, config.widget);
    const { elementNodeProps } = getDefinition(config.widget);

    return render(WidgetEl, {
      key,
      config,
      props: Object.entries(config.props || {}).reduce(
        (acc, [path, { type, value }]) => {
          switch (type) {
            case 'ElementNode': {
              const nodes = Array.isArray(value) ? value : [value];

              const { multiple = false } =
                elementNodeProps?.[path]?.definition || {};

              const children: ReactNode[] = nodes.map((node, i) =>
                generate(node as RenderConfig, i)
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
