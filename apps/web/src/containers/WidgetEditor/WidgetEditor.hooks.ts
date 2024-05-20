import _get from 'lodash/get';
import _set from 'lodash/set';
import { createElement } from 'react';
import type { ComponentType, ReactNode } from 'react';
import type { ElementNodeProp } from '@weavcraft/common';

import { usePropsDefinition } from '~web/contexts';
import type { AppendNodeProps } from './WidgetEditor.types';
import type { PropsDefinition, WidgetConfigs } from '~web/services';
import type { RenderConfig } from '~web/hooks';

const FRAGMENT_DEFINITION: PropsDefinition = {
  componentName: 'Fragment',
  elementNodeProps: {
    children: {
      path: 'children',
      type: 'node',
      required: false,
      definition: {
        clickable: false,
        multiple: false,
      },
    },
  },
};

export function useNodePropsEditedOverride(
  AppendNode: ComponentType<AppendNodeProps>,
  onChange: () => void
) {
  const { getDefinition } = usePropsDefinition();

  return <P extends object>(props: P, config: RenderConfig): P => {
    const { widget: widgetId } = config;
    const definition = getDefinition(widgetId) || FRAGMENT_DEFINITION;
    const { elementNodeProps } = definition;

    return Object.entries(elementNodeProps || {}).reduce(
      (result, [path, { definition }]) => {
        const { clickable, multiple } = definition || {};

        if (multiple) {
          const nodes: ReactNode[] = _get(props, path) || [];

          _set(result, path, [
            ...nodes,
            createElement(AppendNode, {
              key: 'append',
              path,
              variant: clickable ? 'action' : 'node',
              widgetId,
              onAppend: (widget) => {
                const value: WidgetConfigs[] =
                  _get(config, ['props', path, 'value']) || [];

                const propConfig: ElementNodeProp = {
                  type: 'ElementNode',
                  value: [...value, { widget }],
                };

                _set(config, ['props', path], propConfig);
                onChange();
              },
            }),
          ]);
        } else {
          const node: ReactNode = _get(props, path);

          if (!node) {
            _set(
              result,
              path,
              createElement(AppendNode, {
                path,
                widgetId,
                variant: clickable ? 'action' : 'node',
                onAppend: (widget) => {
                  const propConfig: ElementNodeProp = {
                    type: 'ElementNode',
                    value: { widget },
                  };

                  _set(config, ['props', path], propConfig);
                  onChange();
                },
              })
            );
          }
        }

        return result;
      },
      props
    );
  };
}
