import _toPath from 'lodash/toPath';
import { useMemo } from 'react';

import { useCorePropsGetter } from '~web/contexts';
import { useNodeFinder } from '~web/hooks';

import type { EventGetterOptions, EventItem } from './EventList.types';

import type {
  ComponentConfig,
  ConfigPaths,
  WidgetConfigs,
} from '../imports.types';

export function useEventItems(widget: WidgetConfigs) {
  const getCoreProps = useCorePropsGetter();
  const { getChildNodes } = useNodeFinder();

  return useMemo(() => {
    const entries = Object.entries(
      getEventCallbacks(widget, [], { getChildNodes, getCoreProps }).reduce<
        Record<string, EventItem[]>
      >((acc, item) => {
        const { nodePath } = item;
        const { [nodePath]: items = [] } = acc;

        items.push(item);

        return {
          ...acc,
          [nodePath]: items,
        };
      }, {})
    );

    return entries
      .map<[string, EventItem[]]>(([nodePath, items]) => [
        nodePath,
        items.sort(
          ({ config: c1, eventPath: e1 }, { config: c2, eventPath: e2 }) =>
            c1.component.localeCompare(c2.component) || e1.localeCompare(e2)
        ),
      ])
      .sort(([n1], [n2]) => {
        const p1 = _toPath(n1);
        const p2 = _toPath(n2);

        return p1.length - p2.length || n1.localeCompare(n2);
      });
  }, [widget, getCoreProps, getChildNodes]);
}

function getEventCallbacks(
  config: ComponentConfig,
  nodePaths: ConfigPaths,
  { getChildNodes, getCoreProps }: EventGetterOptions
) {
  const { definition } = getCoreProps(config.component);
  const { eventCallbackProps } = definition;

  return Object.entries(getChildNodes(config)).reduce(
    (acc, [childPath, child]) => {
      acc.push(
        ...getEventCallbacks(child, [...nodePaths, ..._toPath(childPath)], {
          getChildNodes,
          getCoreProps,
        })
      );

      return acc;
    },
    Object.keys(eventCallbackProps || {}).map<EventItem>((eventPath) => ({
      config,
      eventPath,
      nodePath: nodePaths.reduce<string>((acc, path, i) => {
        if (typeof path === 'string') {
          acc = `${acc}.${path}`;
        } else if (i < nodePaths.length - 1) {
          acc = `${acc}[${path}]`;
        }

        return acc;
      }, ''),
    }))
  );
}
