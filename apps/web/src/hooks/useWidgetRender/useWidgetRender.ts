import Core from '@weavcraft/core';
import _get from 'lodash/get';
import _set from 'lodash/set';
import type { ComponentType, ReactNode } from 'react';

import { usePropsDefinition } from '~web/contexts';
import type { RenderConfig, RenderFn } from './useWidgetRender.types';

export function useWidgetRender(render: RenderFn) {
  const { getDefinition, getDefinitionsByType } = usePropsDefinition();

  return function generate(config: RenderConfig, key?: number) {
    const WidgetEl: ComponentType = _get(Core, config.widget);
    const definition = getDefinition(config.widget);
    const nodeProps = getDefinitionsByType('node', definition.propsType);

    return render(WidgetEl, {
      key,
      config,
      props: Object.entries(config.props || {}).reduce(
        (acc, [path, { type, value }]) => {
          switch (type) {
            case 'node': {
              const nodes = Array.isArray(value) ? value : [value];
              const { multiple } = nodeProps[path];

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
