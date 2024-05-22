import _debounce from 'lodash/debounce';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import { createElement, useEffect, useId, useMemo, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import type { ElementNodeProp } from '@weavcraft/common';

import { usePropsDefinition } from '~web/contexts';
import type { AppendNodeProps } from './WidgetEditor.types';
import type { PropsDefinition, WidgetConfigs, WidgetType } from '~web/services';
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
) {
  return {
    onAddChild: (config: RenderConfig, path: string, widget: WidgetType) => {
      const propConfig: ElementNodeProp = {
        type: 'ElementNode',
        value: { widget },
      };

      _set(config, ['props', path], propConfig);
      onChange({ ...value });
    },

    onAddLastChild: (
      config: RenderConfig,
      path: string,
      widget: WidgetType
    ) => {
      const nodes: WidgetConfigs[] =
        _get(config, ['props', path, 'value']) || [];

      const propConfig: ElementNodeProp = {
        type: 'ElementNode',
        value: [...nodes, { widget }],
      };

      _set(config, ['props', path], propConfig);
      onChange({ ...value });
    },

    onDeleteNode: (paths: (string | number)[]) => {
      if (!paths.length) {
        return onChange({} as RenderConfig);
      }

      const lastPath = paths.pop() as string | number;

      if (typeof lastPath !== 'number') {
        _unset(value, paths);
      } else {
        const nodes = _get(value, paths);

        nodes.splice(lastPath, 1);
        _set(value, paths, [...nodes]);
      }

      onChange({ ...value });
    },
  };
}

export function useControllerToggleVisible() {
  const targetId = useId();
  const [visible, setVisible] = useState(true);

  const resizeObserver = useMemo(() => {
    const refresh = _debounce(() => setVisible(true), 200);

    return new ResizeObserver(() => {
      setVisible(false);
      refresh();
    });
  }, []);

  useEffect(() => {
    const el = global.document.getElementById(targetId);

    if (el) {
      resizeObserver.observe(el);

      return () => resizeObserver.unobserve(el);
    }
  }, [targetId, resizeObserver]);

  return [targetId, visible] as const;
}

export function useNodePropsEditedOverride(
  AppendNode: ComponentType<AppendNodeProps>,
  {
    onAddChild,
    onAddLastChild,
  }: Pick<ReturnType<typeof useChangeEvents>, 'onAddChild' | 'onAddLastChild'>
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
          onAppend: (widget) => {
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
