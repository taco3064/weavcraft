import * as Core from '@weavcraft/core';
import _get from 'lodash/get';
import _pick from 'lodash/pick';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import type CoreType from '@weavcraft/core';
import type { ElementNodeProp } from '@weavcraft/common';

import { useCorePropsGetter, useNodePaths } from '~web/hooks';
import type { ChangeEvents } from './WidgetEditor.types';

import type {
  ComponentConfig,
  CoreComponent,
  CreateNodeButtonProps,
  MenuItemOptions,
  WidgetConfigs,
} from '../imports.types';

const CATEGORIES = _pick(Core, ['Display', 'Input', 'Interaction', 'Layout']);

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
    onAddChild: (config, path, component) => {
      const propConfig: ElementNodeProp = {
        type: 'ElementNode',
        value: { component, id: nanoid(6) },
      };

      _set(config, ['props', path], propConfig);
      onChange({ ...value });
    },

    onAddLastChild: (config, path, component) => {
      const nodes = (_get(config, ['props', path, 'value']) ||
        []) as ComponentConfig[];

      const propConfig: ElementNodeProp = {
        type: 'ElementNode',
        value: [...nodes, { component, id: nanoid(6) }],
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

export function useWidgetOptions(variant: CreateNodeButtonProps['variant']) {
  const getCoreProps = useCorePropsGetter();

  return useMemo(
    () =>
      Object.entries(CATEGORIES).reduce<MenuItemOptions[]>(
        (acc, [category, components]) => {
          const items = (Object.keys(components) as CoreComponent[]).reduce<
            MenuItemOptions[]
          >((result, component) => {
            const { definition } = getCoreProps(component);

            const { elementNodeProps = {}, eventCallbackProps = {} } =
              definition;

            if (
              /^(Avatar|Icon)$/.test(component) ||
              variant !== 'action' ||
              'onClick' in eventCallbackProps ||
              _get(elementNodeProps, 'toggle.definition.clickable')
            ) {
              result.push({ label: `widgets:lbl-component.${component}` });
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
