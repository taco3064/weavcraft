import { useMemo } from 'react';

import { useCorePropsGetter } from '~web/hooks';
import type { ConfigPaths, ComponentConfig } from '~web/hooks';
import type { ChildNodeGroup, NodePaths } from './ElementNodeList.types';

export function useNodePaths({ component, props = {} }: ComponentConfig) {
  const getCoreProps = useCorePropsGetter();

  const { nodePaths, ...pathFns } = useMemo<NodePaths>(() => {
    const { definition } = getCoreProps(component);
    const { elementNodeProps = {} } = definition;

    return {
      nodePaths: Object.keys(elementNodeProps),

      onPathsGenerate: (nodePath, index, paths = []) => {
        const result: ConfigPaths = [...paths, nodePath];

        if (elementNodeProps[nodePath]?.definition?.multiple) {
          result.push(index);
        }

        return result;
      },
      onWidgetChildrenGenerate: ({ component, props = {} }) => {
        const { definition } = getCoreProps(component);
        const { elementNodeProps = {} } = definition;
        const nodePaths = Object.keys(elementNodeProps);

        return nodePaths.reduce<ComponentConfig[]>((result, nodePath) => {
          const { [nodePath]: nodes } = props;

          if (nodes?.value && nodes.type === 'ElementNode') {
            const isMultiple = Array.isArray(nodes.value);

            result.push(
              ...((isMultiple
                ? nodes.value
                : [nodes.value]) as ComponentConfig[])
            );
          }

          return result;
        }, []);
      },
    };
  }, [component, getCoreProps]);

  return {
    ...pathFns,

    childGroups: nodePaths.reduce<ChildNodeGroup[]>((acc, path) => {
      const { [path]: nodes } = props;

      if (nodes?.value && nodes.type === 'ElementNode') {
        const isMultiple = Array.isArray(nodes.value);

        const chidlren = (
          isMultiple ? nodes.value : [nodes.value]
        ) as ComponentConfig[];

        acc.push({ path, chidlren, showIndex: isMultiple });
      }

      return acc;
    }, []),
  };
}
