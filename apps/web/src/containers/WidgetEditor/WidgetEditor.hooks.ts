import * as Core from '@weavcraft/core';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import { createElement, useCallback, useMemo, useState } from 'react';
import type CoreType from '@weavcraft/core';
import type { ComponentType, ReactNode } from 'react';
import type { ElementNodeProp } from '@weavcraft/common';

import { useCorePropsGetter } from '~web/contexts';
import { useWidgetNodePaths } from '~web/hooks';

import type {
  ChangeEvents,
  NodeCreateButtonProps,
  PropItem,
} from './WidgetEditor.types';

import type {
  MappingPath,
  MenuItemOptions,
  RenderConfig,
  WidgetConfigs,
  WidgetType,
} from '../imports.types';

const { default: _Core, ...CATEGORIES } = Core;

const ICON: Record<keyof typeof CATEGORIES, CoreType.IconCode> = {
  Display: 'faTableList',
  Input: 'faPenToSquare',
  Interaction: 'faClapperboard',
  Layout: 'faBorderNone',
};

export function useChangeEvents(
  value: WidgetConfigs,
  onChange: (value: WidgetConfigs) => void
): ChangeEvents {
  const { getNodePaths } = useWidgetNodePaths();

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
      const nodes: RenderConfig[] =
        _get(config, ['props', path, 'value']) || [];

      const propConfig: ElementNodeProp = {
        type: 'ElementNode',
        value: [...nodes, { widget }],
      };

      _set(config, ['props', path], propConfig);
      onChange({ ...value });
    },

    onConfigChange: (config, propPath, propValue) => {
      if (propPath) {
        if (propValue) {
          _set(config, ['props', propPath], propValue);
        } else {
          _unset(config, ['props', propPath]);
        }
      }

      onChange({ ...value });
    },

    onDeleteNode: (paths) => {
      if (!paths.length) {
        return onChange({} as WidgetConfigs);
      }

      const fullPaths = getNodePaths(paths);
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
  };
}

export function useNodeCreateButton(
  AppendNode: ComponentType<NodeCreateButtonProps>,
  disabled: boolean,
  {
    onAddChild,
    onAddLastChild,
  }: Pick<ChangeEvents, 'onAddChild' | 'onAddLastChild'>
) {
  const getCoreProps = useCorePropsGetter();

  return <P extends object>(props: P, config: RenderConfig): P => {
    if (disabled) {
      return props;
    }

    const { widget } = config;
    const { definition } = getCoreProps(widget);
    const { dataBindingProps, elementNodeProps } = definition;

    if (
      dataBindingProps &&
      'records' in dataBindingProps &&
      !_get(config, ['props', 'records', 'value'])
    ) {
      _set(props, 'records', [{}]);
    }

    return Object.entries(elementNodeProps || {}).reduce(
      (result, [path, { definition }]) => {
        const { clickable, multiple } = definition || {};
        const target = _get(props, path);

        const appendNode = createElement(AppendNode, {
          key: 'append',
          path,
          config,
          variant: clickable ? 'action' : 'node',
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

export function usePropItems(config: RenderConfig) {
  const getCoreProps = useCorePropsGetter();

  const { widget, props = {} } = config;
  const { childrenBasePath, definition } = getCoreProps(widget);

  const getMappingProp = useCallback(
    (propPath: string) => {
      const { dataBindingProps } = definition;
      const isChildProps = propPath.startsWith(`${childrenBasePath}.`);

      const mappingPath = (
        isChildProps ? `${childrenBasePath}.propMapping` : 'propMapping'
      ) as MappingPath;

      const mappingProps: string[] =
        _get(dataBindingProps || {}, [mappingPath, 'definition']) || [];

      const path = isChildProps
        ? propPath.replace(`${childrenBasePath}.`, '')
        : propPath;

      return {
        propName: path,
        mappable: mappingProps.includes(path),
        mappingPath,
      };
    },
    [childrenBasePath, definition]
  );

  const [mappingItems, setMappingItems] = useState<Record<string, boolean>>(
    () =>
      Object.keys(definition.primitiveValueProps || {}).reduce((acc, path) => {
        const { propName, mappable, mappingPath } = getMappingProp(path);
        const fieldPath = _get(props, [mappingPath, 'value', propName]);

        return {
          ...acc,
          ...(mappable && {
            [path]: Boolean(fieldPath),
          }),
        };
      }, {})
  );

  return {
    mappingItems,

    propItems: Object.entries(definition.primitiveValueProps || {})
      .sort(([key1], [key2]) => key1.localeCompare(key2))
      .map<PropItem>(([path, definition]) => {
        const { propName, mappable, mappingPath } = getMappingProp(path);

        return {
          path,
          definition,
          mappable,
          fieldPath: _get(props, [mappingPath, 'value', propName]),
        };
      }),

    onMappingExpand: (path: string) =>
      setMappingItems((prev) => ({
        ...prev,
        [path]: !prev[path],
      })),
  };
}

export function useWidgetOptions(variant: NodeCreateButtonProps['variant']) {
  const getCoreProps = useCorePropsGetter();

  return useMemo(
    () =>
      Object.entries(CATEGORIES).reduce<MenuItemOptions[]>(
        (acc, [category, widgets]) => {
          const items = (Object.keys(widgets) as WidgetType[]).reduce<
            MenuItemOptions[]
          >((result, widget) => {
            const { definition } = getCoreProps(widget);

            const { elementNodeProps = {}, eventCallbackProps = {} } =
              definition;

            if (
              /^(Avatar|Icon)$/.test(widget) ||
              variant !== 'action' ||
              'onClick' in eventCallbackProps ||
              _get(elementNodeProps, 'toggle.definition.clickable')
            ) {
              result.push({ label: `widgets:lbl-widgets.${widget}` });
            }

            return result;
          }, []);

          if (items.length) {
            acc.push({
              icon: ICON[category as keyof typeof ICON],
              label: `widgets:lbl-category.${category}`,
              items,
            });
          }

          return acc;
        },
        []
      ),
    [variant, getCoreProps]
  );
}
