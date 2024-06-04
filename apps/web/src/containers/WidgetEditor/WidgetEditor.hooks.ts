import _get from 'lodash/get';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import { Children, createElement, useMemo } from 'react';
import type { ComponentType, ReactNode } from 'react';
import type { ElementNodeProp } from '@weavcraft/common';

import { usePropsDefinition } from '~web/contexts';
import type { ConfigPaths, RenderConfig } from '~web/hooks';
import type { EditorListClasses } from '~web/components';
import type { PropsDefinition, WidgetConfigs } from '~web/services';

import type {
  ChangeEvents,
  ChildrenArray,
  NodeCreateButtonProps,
  NodeItemProps,
  NodePaths,
  PrimitiveItemProps,
} from './WidgetEditor.types';

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

function getWidgetNodePaths(paths: ConfigPaths) {
  return paths
    .map((path) => (typeof path === 'string' ? ['props', path, 'value'] : path))
    .flat();
}

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

export function useNodeItems(
  ElementNodeItem: ComponentType<NodeItemProps>,
  defaultProps: Pick<
    NodeItemProps,
    'active' | 'onActive' | 'onDelete' | 'onEdit'
  >,
  config?: RenderConfig
) {
  const { widget, props = {} } = config || {};
  const { getDefinition } = usePropsDefinition();

  const { nodePaths, onPathsGenerate, onWidgetChildrenGenerate } =
    useMemo<NodePaths>(() => {
      const { elementNodeProps = {} } = getDefinition(widget) || {};

      return {
        nodePaths: Object.keys(elementNodeProps),

        onPathsGenerate: (nodePath, index, paths = []) => {
          const result: ConfigPaths = [...paths, nodePath];

          if (elementNodeProps[nodePath]?.definition?.multiple) {
            result.push(index);
          }

          return result;
        },
        onWidgetChildrenGenerate: ({ widget, props = {} }) => {
          const { elementNodeProps = {} } = getDefinition(widget) || {};
          const nodePaths = Object.keys(elementNodeProps);

          return nodePaths.reduce<RenderConfig[]>((result, nodePath) => {
            const { [nodePath]: nodes } = props;

            if (nodes?.value && nodes.type === 'ElementNode') {
              const isMultiple = Array.isArray(nodes.value);

              result.push(
                ...((isMultiple
                  ? nodes.value
                  : [nodes.value]) as RenderConfig[])
              );
            }

            return result;
          }, []);
        },
      };
    }, [widget, getDefinition]);

  return (classes: EditorListClasses) =>
    nodePaths.reduce<ChildrenArray>((items, path) => {
      const { [path]: nodes } = props;

      if (nodes?.value && nodes.type === 'ElementNode') {
        const isMultiple = Array.isArray(nodes.value);

        const widgets = (
          isMultiple ? nodes.value : [nodes.value]
        ) as RenderConfig[];

        widgets.length &&
          items.push(
            ...Children.toArray(
              createElement(ElementNodeItem, {
                ...defaultProps,
                classes,
                isMultiple,
                key: path,
                path,
                widgets,
                onPathsGenerate,
                onWidgetChildrenGenerate,
              })
            )
          );
      }

      return items;
    }, []);
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

export function usePrimitiveItems(
  PrimitiveItem: ComponentType<PrimitiveItemProps>,
  { config, onChange }: Pick<PrimitiveItemProps, 'config' | 'onChange'>
) {
  const { widget, props = {} } = config || {};
  const { getDefinition } = usePropsDefinition();

  const primitiveProps = useMemo(() => {
    const { primitiveValueProps = {} } = getDefinition(widget) || {};

    return Object.entries(primitiveValueProps);
  }, [widget, getDefinition]);

  return (classes: EditorListClasses) =>
    primitiveProps.map<ReactNode>(([path, proptypes]) => {
      const { [path]: primitive } = props;

      return createElement(PrimitiveItem, {
        config,
        classes,
        key: path,
        proptypes,
        path,
        value: primitive?.value,
        onChange,
      });
    });
}

export function useWidgetNodePaths(paths: ConfigPaths) {
  return useMemo(() => getWidgetNodePaths(paths), [paths]);
}
