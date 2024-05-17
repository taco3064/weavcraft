import _get from 'lodash/get';
import _set from 'lodash/set';
import type { ComponentType, ReactNode } from 'react';

import { usePropsDefinition } from '~web/contexts';
import type { AppendNodeProps, PropType } from './WidgetEditor.types';
import type { RenderConfig } from '~web/hooks';

import type {
  PropTypeDefinitions,
  PropertyDefinitions,
  PropsDefinition,
} from '~web/services';

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

function getDefinitionByType<T extends PropType>(
  targetType: T,
  propsType: PropertyDefinitions
): Record<
  string,
  NonNullable<Extract<PropTypeDefinitions.PropTypes, { type: T }>['definition']>
> {
  return Object.entries(propsType).reduce(
    (acc, [path, { type, definition }]) => {
      if (type === targetType) {
        return { ...acc, [path]: definition };
      } else if (type !== 'object') {
        return acc;
      }

      const result = getDefinitionByType(
        targetType,
        (definition || {}) as PropertyDefinitions
      );

      return Object.entries(result).reduce(
        (subAcc, [subPath, subDefinition]) => ({
          ...subAcc,
          [`${path}.${subPath}`]: subDefinition,
        }),
        acc
      );
    },
    {}
  );
}

export function useNodePropsEditedOverride(
  AppendNode: ComponentType<AppendNodeProps>,
  onAppend: AppendNodeProps['onAppend']
) {
  const { getDefinition } = usePropsDefinition();

  return function override<P extends object>(
    props: P,
    config: RenderConfig
  ): P {
    const { widget: widgetId } = config;
    const definition = getDefinition(widgetId) || FRAGMENT_DEFINITION;
    const nodeProps = getDefinitionByType('node', definition.propsType);

    return Object.entries(nodeProps).reduce((result, [path, definition]) => {
      const { multiple } = definition;

      if (multiple) {
        const nodes: ReactNode[] = _get(props, path) || [];

        nodes.push(<AppendNode {...{ config, definition, path, onAppend }} />);
        _set(result, path, nodes);
      } else {
        const node: ReactNode = _get(props, path);

        if (!node) {
          _set(
            result,
            path,
            <AppendNode {...{ config, definition, path, onAppend }} />
          );
        }
      }

      return result;
    }, props);
  };
}
