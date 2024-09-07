import { useContext, useEffect, useMemo, useState } from 'react';
import { useReactFlow } from '@xyflow/react';
import { useQuery } from '@tanstack/react-query';

import { Context } from '~web/contexts';
import { getHierarchies } from '~web/services';
import { DataPropEnum } from '../usePropsInjection';
import type { PageLayoutConfigs } from '../imports.types';

import type {
  HierarchyWidget,
  MenuItemOptions,
} from './useHierarchyDataContext.types';

export function useHierarchyWidgetsQuery(
  layouts: PageLayoutConfigs['layouts'],
  isTutorialMode = false
) {
  const [hierarchyWidgets, setHierarchyWidgets] = useState<
    Record<string, HierarchyWidget>
  >({});

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
    setHierarchyWidgets(
      (hierarchies || []).reduce(
        (acc, hierarchy) => ({
          ...acc,
          [hierarchy.payloadId as string]: hierarchy,
        }),
        {}
      )
    );
  }, [hierarchies]);

  return [hierarchyWidgets, setHierarchyWidgets] as const;
}

export function useWidgetSources(
  type: DataPropEnum,
  refId: string
): MenuItemOptions[] {
  const level = useFlowLevel(refId);

  const hierarchyWidgets = useContext(Context.HierarchyData) as Record<
    string,
    HierarchyWidget
  >;

  console.log(type, level, hierarchyWidgets);

  // const layouts = useMemo(() => );

  return [];
}

function useFlowLevel(refId: string) {
  const { getNode } = useReactFlow();

  return useMemo(() => {
    const getNodeLevel = (id: string): number => {
      const node = getNode(id);

      return (
        (!node ? 0 : 1) + (node?.parentId ? getNodeLevel(node.parentId) : 0)
      );
    };

    return getNodeLevel(refId);
  }, [refId, getNode]);
}
