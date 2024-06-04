import _get from 'lodash/get';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import { createElement } from 'react';
import type { ComponentType, ReactNode } from 'react';
import type { ElementNodeProp } from '@weavcraft/common';

import { getWidgetNodePaths } from '~web/hooks';
import { usePropsDefinition } from '~web/contexts';
import type { ChangeEvents, NodeCreateButtonProps } from './WidgetEditor.types';
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

export function useChangeEvents(
  value: RenderConfig,
  onChange: (value: RenderConfig) => void
): ChangeEvents {
  return {
    onAddChild: (config, path, widget) => {
      const propConfig: ElementNodeProp = {
        type: 'ElementNode',
        value: { widget },
      };

      _set(config, ['props', path], propConfig);
      onChange({ ...value });
    },

    onAddLastChild: (config, path, widget) => {
      const nodes: WidgetConfigs[] =
        _get(config, ['props', path, 'value']) || [];

      const propConfig: ElementNodeProp = {
        type: 'ElementNode',
        value: [...nodes, { widget }],
      };

      _set(config, ['props', path], propConfig);
      onChange({ ...value });
    },

    onDeleteNode: (paths) => {
      if (!paths.length) {
        return onChange({} as RenderConfig);
      }

      const fullPaths = getWidgetNodePaths(paths);
      const lastPath = fullPaths.pop() as string | number;

      if (typeof lastPath !== 'number') {
        _unset(value, fullPaths);
      } else {
        const nodes = _get(value, fullPaths);

        nodes.splice(lastPath, 1);
        _set(value, fullPaths, [...nodes]);
      }

      onChange({ ...value });
    },

    onConfigChange: (config, propPath, propValue) => {
      if (propValue) {
        _set(config, ['props', propPath], propValue);
      } else {
        _unset(config, ['props', propPath]);
      }

      onChange({ ...value });
    },
  };
}

export function useNodeCreate(
  AppendNode: ComponentType<NodeCreateButtonProps>,
  {
    onAddChild,
    onAddLastChild,
  }: Pick<ChangeEvents, 'onAddChild' | 'onAddLastChild'>
) {
  const { getDefinition } = usePropsDefinition();

  return <P extends object>(props: P, config: RenderConfig): P => {
    const { widget: widgetId } = config;
    const definition = getDefinition(widgetId) || FRAGMENT_DEFINITION;
    const { elementNodeProps } = definition;

    return Object.entries(elementNodeProps || {}).reduce(
      (result, [path, { definition }]) => {
        const { clickable, multiple } = definition || {};
        const target = _get(props, path);

        const appendNode = createElement(AppendNode, {
          key: 'append',
          path,
          variant: clickable ? 'action' : 'node',
          widgetId,
          onClick: (widget) => {
            const onAdd = multiple ? onAddLastChild : onAddChild;

            onAdd(config, path, widget);
          },
        });

        if (multiple) {
          _set(result, path, [...((target || []) as ReactNode[]), appendNode]);
        } else if (!target) {
          _set(result, path, appendNode);
        }

        return result;
      },
      props
    );
  };
}
