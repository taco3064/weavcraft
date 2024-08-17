import _toPath from 'lodash/toPath';
import { useMemo } from 'react';

import { useCorePropsGetter } from '~web/contexts';
import { useNodeFinder, useNodePaths } from '~web/hooks';
import type { EventGetterOptions, EventItem } from './EventList.types';

import type {
  ComponentConfig,
  ConfigPaths,
  WidgetConfigs,
} from '../imports.types';

export function useEventItems(widget: WidgetConfigs) {
  const getCoreProps = useCorePropsGetter();
  const { getChildNodes } = useNodeFinder();

  return useMemo(
    () =>
      getEventCallbacks(widget, [], { getChildNodes, getCoreProps }).sort(
        (
          { component: c1, nodePaths: n1, eventPath: e1 },
          { component: c2, nodePaths: n2, eventPath: e2 }
        ) => {
          const sn1 = JSON.stringify(n1);
          const sn2 = JSON.stringify(n2);

          return (
            sn1.localeCompare(sn2) ||
            c1.localeCompare(c2) ||
            e1.localeCompare(e2)
          );
        }
      ),
    [widget, getCoreProps, getChildNodes]
  );
}

function getEventCallbacks(
  config: ComponentConfig,
  nodePaths: ConfigPaths,
  { getChildNodes, getCoreProps }: EventGetterOptions
) {
  const { definition } = getCoreProps(config.component);
  const { eventCallbackProps } = definition;

  const nodePath = nodePaths.reduce<string>((acc, path) => {
    if (typeof path === 'string') {
      acc = `${acc}.${path}`;
    } else {
      acc = `${acc}[${path}]`;
    }

    return acc;
  }, '');

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
      component: config.component,
      eventPath,
      nodePath,
      nodePaths,
    }))
  );
}
