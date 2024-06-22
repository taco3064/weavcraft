import _get from 'lodash/get';
import { useCallback, useMemo } from 'react';

import { useCorePropsGetter } from '~web/contexts';
import type { ConfigPaths, RenderConfig } from '../useWidgetRender';
import type { WidgetConfigs } from '../imports.types';
import type { GetterOptions, ParentStoreNode } from './useNodeFinder.types';

export function useNodeFinder() {
  const getCoreProps = useCorePropsGetter();
  const { getNodePaths } = useNodePaths();

  const getNode = (widget: WidgetConfigs, paths: ConfigPaths): RenderConfig =>
    !paths.length ? widget : _get(widget, getNodePaths(paths));

  return {
    getNode,

    getParentStoreNode: (widget: WidgetConfigs, paths: ConfigPaths) =>
      getParentStoreNode(widget, paths, { getCoreProps, getNode }),

    getAllParentStoreNodes: (widget: WidgetConfigs, paths: ConfigPaths) => {
      const result = [
        getParentStoreNode(widget, paths, { getCoreProps, getNode }),
      ].filter(Boolean) as ParentStoreNode[];

      while (result.at(-1)?.paths.length) {
        result.push(
          getParentStoreNode(widget, result.at(-1)?.paths || [], {
            getCoreProps,
            getNode,
          }) as ParentStoreNode
        );
      }

      return result;
    },
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

function getParentStoreNode(
  widget: WidgetConfigs,
  paths: ConfigPaths,
  { getCoreProps, getNode }: GetterOptions
): ParentStoreNode | null {
  if (!paths.length) {
    return null;
  }

  const isMultiple = typeof paths[paths.length - 1] === 'number';
  const popPaths = paths.slice(0, isMultiple ? -2 : -1);
  const node = getNode(widget, popPaths);

  return getCoreProps(node.widget).isStoreWidget
    ? { node, paths: popPaths }
    : getParentStoreNode(widget, popPaths, { getCoreProps, getNode });
}
