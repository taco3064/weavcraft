import _get from 'lodash/get';
import _set from 'lodash/set';
import type { ComponentType, ReactNode } from 'react';
import type { NodeProp } from '@weavcraft/common';

import { usePropsDefinition } from '~web/contexts';
import type { AppendNodeProps } from './WidgetEditor.types';
import type { PropsDefinition, WidgetConfigs } from '~web/services';
import type { RenderConfig } from '~web/hooks';

const FRAGMENT_DEFINITION: PropsDefinition = {
  componentName: 'Fragment',
  propsType: {
    children: {
      name: 'children',
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
  const { getDefinition, getDefinitionsByType } = usePropsDefinition();

  return <P extends object>(props: P, config: RenderConfig): P => {
    const { widget: widgetId } = config;
    const definition = getDefinition(widgetId) || FRAGMENT_DEFINITION;
    const nodeProps = getDefinitionsByType('node', definition.propsType);

    return Object.entries(nodeProps).reduce((result, [path, definition]) => {
      const { clickable, multiple } = definition;

      if (multiple) {
        const nodes: ReactNode[] = _get(props, path) || [];

        _set(result, path, [
          ...nodes,
          <AppendNode
            key="append"
            path={path}
            variant={clickable ? 'action' : 'node'}
            onAppend={(widget) => {
              const value: WidgetConfigs[] =
                _get(config, ['props', path, 'value']) || [];

              const propConfig: NodeProp = {
                type: 'node',
                value: [...value, { widget }],
              };

              _set(config, ['props', path], propConfig);
              onChange();
            }}
          />,
        ]);
      } else {
        const node: ReactNode = _get(props, path);

        if (!node) {
          _set(
            result,
            path,
            <AppendNode
              path={path}
              variant={clickable ? 'action' : 'node'}
              onAppend={(widget) => {
                const propConfig: NodeProp = {
                  type: 'node',
                  value: { widget },
                };

                _set(config, ['props', path], propConfig);
                onChange();
              }}
            />
          );
        }
      }

      return result;
    }, props);
  };
}
