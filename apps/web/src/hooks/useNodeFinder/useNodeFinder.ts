import _get from 'lodash/get';
import { useCallback, useMemo } from 'react';

import { useCorePropsGetter } from '~web/contexts';
import type { ConfigPaths, ComponentConfig } from '../useWidgetRender';
import type { WidgetConfigs } from '../imports.types';

import type {
  GetterOptions,
  NodeFinderHookReturn,
  ParentNode,
} from './useNodeFinder.types';

export function useNodeFinder(): NodeFinderHookReturn {
  const getCoreProps = useCorePropsGetter();
  const { getNodePaths } = useNodePaths();

  const getNode = (
    widget: WidgetConfigs,
    paths: ConfigPaths
  ): ComponentConfig =>
    !paths.length ? widget : _get(widget, getNodePaths(paths));

  return {
    getNode,

    getParentNode: (
      widget: WidgetConfigs,
      paths: ConfigPaths,
      filter?: GetterOptions['filter']
    ) => getParentNode(widget, paths, { filter, getNode })?.node || null,

    getParentStoreNode: (widget: WidgetConfigs, paths: ConfigPaths) =>
      getParentNode(widget, paths, {
        getNode,
        filter: ({ component }) => getCoreProps(component).isStoreWidget,
      })?.node || null,

    getChildNodes: useCallback(
      ({ component, props = {} }: ComponentConfig) => {
        const { definition } = getCoreProps(component);
        const { elementNodeProps } = definition;

        return Object.keys(elementNodeProps || {})
          .map(
            (path) => (_get(props, [path, 'value']) || []) as ComponentConfig[]
          )
          .flat();
      },
      [getCoreProps]
    ),
  };
}

export function useNodePaths(paths?: ConfigPaths) {
  const stringify = JSON.stringify(paths || []);

  const getNodePaths = useCallback(
    (paths: ConfigPaths) =>
      paths
        .map((path) =>
          typeof path === 'string' ? ['props', path, 'value'] : path
        )
        .flat(),
    []
  );

  return {
    getNodePaths,

    nodePaths: useMemo(() => getNodePaths(paths || []), [paths, getNodePaths]),

    pathDescription: useMemo(() => {
      const paths: ConfigPaths = JSON.parse(stringify);
      const lastIndex = paths.length - 1;
      const isMultiple = typeof paths[lastIndex] === 'number';

      return [
        paths[isMultiple ? lastIndex - 1 : lastIndex],
        !isMultiple ? '' : `[${paths[lastIndex]}]`,
      ].join('');
    }, [stringify]),
  };
}

function getParentNode(
  widget: WidgetConfigs,
  paths: ConfigPaths,
  { filter = () => true, getNode }: GetterOptions
): ParentNode | null {
  if (!paths.length) {
    return null;
  }

  const isMultiple = typeof paths[paths.length - 1] === 'number';
  const popPaths = paths.slice(0, isMultiple ? -2 : -1);
  const node = getNode(widget, popPaths);

  return filter(node)
    ? { node, paths: popPaths }
    : getParentNode(widget, popPaths, { filter, getNode });
}
