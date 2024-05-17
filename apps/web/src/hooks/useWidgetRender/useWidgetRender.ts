import Core from '@weavcraft/core';
import _get from 'lodash/get';
import _isPlainObject from 'lodash/isPlainObject';
import _set from 'lodash/set';
import { Fragment } from 'react';
import type { ComponentType, ReactNode } from 'react';

import type { RenderConfig, RenderFn } from './useWidgetRender.types';
import type { WidgetType } from '~web/services';

export function useWidgetRender(render: RenderFn) {
  return function generate(config: RenderConfig, key?: number) {
    const WidgetEl: ComponentType = _get(
      Core,
      config.widget as WidgetType,
      Fragment
    );

    return render(WidgetEl, {
      key,
      config,
      props: Object.entries(config.props || {}).reduce(
        (acc, [path, { type, value }]) => {
          switch (type) {
            case 'node': {
              const nodes = Array.isArray(value) ? value : [value];

              const children: ReactNode[] = nodes.map((node, i) =>
                !_isPlainObject(node)
                  ? (node as ReactNode)
                  : generate(node as RenderConfig, i)
              );

              return _set(
                acc,
                path,
                Array.isArray(value) ? children : children[0]
              );
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
