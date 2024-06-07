import * as Core from '@weavcraft/core';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import { createElement, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import type CoreType from '@weavcraft/core';
import type { ComponentType, ReactNode } from 'react';
import type { ElementNodeProp } from '@weavcraft/common';

import { getWidgetNodePaths } from '~web/hooks';
import { usePropsDefinition } from '~web/contexts';
import type { ChangeEvents, NodeCreateButtonProps } from './WidgetEditor.types';
import type { MenuItemOptions, RenderConfig } from '~web/hooks';
import type { WidgetConfigs, WidgetType } from '~web/services';

const { default: _Core, ...CATEGORIES } = Core;

const ICON: Record<keyof typeof CATEGORIES, CoreType.IconCode> = {
  Display: 'faTableList',
  Input: 'faPenToSquare',
  Interaction: 'faClapperboard',
  Layout: 'faBorderNone',
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

export function useNodeCreate({
  path,
  variant,
  widgetId,
}: Pick<NodeCreateButtonProps, 'path' | 'variant' | 'widgetId'>) {
  const { t } = useTranslation();
  const { getDefinition } = usePropsDefinition();

  const subtitle = [widgetId && t(`widgets:lbl-widgets.${widgetId}`), path]
    .filter(Boolean)
    .join(' - ');

  return {
    subtitle,

    tooltip: [
      t(`widgets:btn-add-${variant === 'action' ? 'trigger' : 'widget'}`),
      !subtitle ? '' : ` (${subtitle})`,
    ].join(' '),

    items: useMemo(
      () =>
        Object.entries(CATEGORIES).reduce<MenuItemOptions[]>(
          (acc, [category, widgets]) => {
            const items = (Object.keys(widgets) as WidgetType[]).reduce<
              MenuItemOptions[]
            >((result, widget) => {
              const { elementNodeProps = {}, eventCallbackProps = {} } =
                getDefinition(widget);

              if (
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
      [variant, getDefinition]
    ),
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
  const { getDefinition } = usePropsDefinition();

  return <P extends object>(props: P, config: RenderConfig): P => {
    if (disabled) {
      return props;
    }

    const { widget } = config;
    const definition = getDefinition(widget);
    const { elementNodeProps } = definition;

    return Object.entries(elementNodeProps || {}).reduce(
      (result, [path, { definition }]) => {
        const { clickable, multiple } = definition || {};
        const target = _get(props, path);

        const appendNode = createElement(AppendNode, {
          key: 'append',
          path,
          variant: clickable ? 'action' : 'node',
          widgetId: widget,
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
