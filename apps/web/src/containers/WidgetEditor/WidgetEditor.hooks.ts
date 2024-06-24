import * as Core from '@weavcraft/core';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import { createElement, useMemo } from 'react';
import { nanoid } from 'nanoid';
import type CoreType from '@weavcraft/core';
import type { ComponentType, ReactNode } from 'react';
import type { ElementNodeProp } from '@weavcraft/common';

import { useCorePropsGetter } from '~web/contexts';
import { useNodePaths } from '~web/hooks';

import type { ChangeEvents, NodeCreateButtonProps } from './WidgetEditor.types';

import type {
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
  const { getNodePaths } = useNodePaths();

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

    onStructureChange: ({ fieldPath, oldFieldPath, paths, isStructure }) => {
      const structure = value.dataStructure || [];

      const target = paths.reduce<WidgetConfigs['dataStructure']>(
        (result, path) => {
          const target = result?.find(
            (field) => Array.isArray(field) && field[0] === path
          );

          return Array.isArray(target) ? target[1] : undefined;
        },
        structure
      );

      const index =
        target?.findIndex((field) => {
          const [fieldPath] = Array.isArray(field) ? field : [field];

          return fieldPath === oldFieldPath;
        }) ?? -1;

      if (index < 0) {
        target?.push(isStructure ? [fieldPath, []] : fieldPath);
      } else if (target && fieldPath !== oldFieldPath) {
        _set(target, isStructure ? [index, 0] : [index], fieldPath);
      } else {
        target?.splice(index, 1);
      }

      onChange({
        ...value,
        dataStructure: JSON.parse(JSON.stringify(structure)),
      });
    },
  };
}

export function useNodeCreateButton(
  AppendNode: ComponentType<NodeCreateButtonProps>,
  dataStructure: WidgetConfigs['dataStructure'],
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
      const mappingPath = Object.keys(dataBindingProps).find((key) =>
        key.endsWith('.propMapping')
      );

      const idIndexes = _get(config, [
        'props',
        mappingPath as string,
        'value',
        'id',
      ]);

      const idField = _get(dataStructure, idIndexes) as string;

      _set(props, 'records', [!idField ? {} : _set({}, idField, nanoid())]);
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
