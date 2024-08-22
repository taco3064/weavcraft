import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getHierarchies } from '~web/services';
import type { HierarchyWidget } from './useHierarchyWidgets.types';
import type { PageLayoutConfigs } from '../imports.types';

export function useHierarchyWidgets(
  layouts: PageLayoutConfigs['layouts'],
  isTutorialMode = false
) {
  const [widgets, setWidgets] = useState<Record<string, HierarchyWidget>>({});

  const { data: hierarchies } = useQuery({
    enabled: Boolean(layouts.length),
    queryFn: getHierarchies,
    queryKey: [
      'widgets',
      true,
      layouts.map(({ widgetId }) => widgetId) || [],
      isTutorialMode,
    ],
  });

  useEffect(() => {
    setWidgets(
      (hierarchies || []).reduce(
        (acc, hierarchy) => ({
          ...acc,
          [hierarchy.payloadId as string]: hierarchy,
        }),
        {}
      )
    );
  }, [hierarchies]);

  return [widgets, setWidgets] as const;
}
