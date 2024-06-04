import { useMemo } from 'react';

import type { ConfigPaths } from '../useWidgetRender';

export function getWidgetNodePaths(paths: ConfigPaths) {
  return paths
    .map((path) => (typeof path === 'string' ? ['props', path, 'value'] : path))
    .flat();
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

export function useWidgetNodePaths(paths: ConfigPaths) {
  return useMemo(() => getWidgetNodePaths(paths), [paths]);
}
