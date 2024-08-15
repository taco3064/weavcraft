import { nanoid } from 'nanoid';
import { useEffect, useId, useMemo, useState, useTransition } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Breakpoint } from '@mui/material/styles';

import { NAV_ITEMS } from '~web/hooks';
import { ViewModeEnum } from './PageLayoutsEditor.types';
import { useTutorialMode } from '~web/contexts';
import type { MenuDialogProps } from '~web/components';

import {
  EnumHierarchyType,
  getHierarchies,
  getWidgetConfigs,
  searchHierarchies,
} from '~web/services';

import type {
  ChangeEvents,
  WidgetCreateButtonProps,
  WidgetLayout,
} from './PageLayoutsEditor.types';

import type {
  HierarchyData,
  PageLayoutConfigs,
  WidgetConfigs,
} from '../imports.types';

export function useChangeEvents(
  breakpoint: Breakpoint,
  viewMode: ViewModeEnum | undefined,
  config: PageLayoutConfigs | undefined,
  value: PageLayoutConfigs,
  onChange: (value: PageLayoutConfigs) => void
): [Record<string, HierarchyData<WidgetConfigs>>, ChangeEvents] {
  const isTutorialMode = useTutorialMode();
  const [, startTransition] = useTransition();

  const [widgets, setWidgets] = useState<
    Record<string, HierarchyData<WidgetConfigs>>
  >({});

  const { data: hierarchies } = useQuery({
    enabled: Boolean(config?.layouts.length),
    queryHash: 'pages-hierarchies',
    queryFn: getHierarchies,
    queryKey: [
      'widgets',
      true,
      config?.layouts.map(({ widgetId }) => widgetId) || [],
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

  return [
    widgets,

    {
      onCreate: (hierarchy) =>
        startTransition(() => {
          const layout: WidgetLayout = {
            id: nanoid(),
            widgetId: hierarchy.payloadId as string,
            spans: { xs: { cols: 1, rows: 1 } },
          };

          setWidgets({
            ...widgets,
            [hierarchy.payloadId as string]: hierarchy,
          });
          onChange({ ...value, layouts: [...value.layouts, layout] });
        }),
      onRemove: (layoutId) =>
        startTransition(() => {
          const layout = value.layouts.find(
            ({ id }) => id === layoutId
          ) as WidgetLayout;

          value.layouts.splice(value.layouts.indexOf(layout), 1);
          onChange({ ...value, layouts: [...value.layouts] });

          if (
            !value.layouts.some(({ widgetId }) => widgetId === layout.widgetId)
          ) {
            delete widgets[layout.widgetId];
            setWidgets({ ...widgets });
          }
        }),
      onResize:
        viewMode === ViewModeEnum.Preview
          ? undefined
          : (target, span) =>
              onChange({
                ...value,
                layouts: value.layouts.map((layout) =>
                  layout.id !== target.id
                    ? layout
                    : {
                        ...layout,
                        spans: {
                          ...layout.spans,
                          [breakpoint]: span,
                        },
                      }
                ),
              }),

      onResort:
        viewMode === ViewModeEnum.Preview
          ? undefined
          : (layouts) => onChange({ ...value, layouts }),
    },
  ];
}

export function useWidgetCreate(
  title: string,
  onCreate: WidgetCreateButtonProps['onCreate']
): {
  hierarchies: HierarchyData[];
  onItemClick: MenuDialogProps['onItemClick'];
} {
  const [hierarchies, setHierarchies] = useState<HierarchyData[]>();

  const isTutorialMode = useTutorialMode();
  const queryHash = useId();

  const { data: root } = useQuery({
    queryHash,
    queryKey: [{ category: 'widgets' }, isTutorialMode],
    queryFn: searchHierarchies,
  });

  const getValidHierarchies = (data?: HierarchyData[]) =>
    data
      ?.sort(({ type: t1 }, { type: t2 }) => t1.localeCompare(t2))
      .filter(
        ({ type, payloadId }) => type === EnumHierarchyType.GROUP || payloadId
      ) || [];

  return {
    hierarchies: useMemo(() => getValidHierarchies(root), [root]),

    onItemClick: async (_e: string, index: number) => {
      const hierarchy = (hierarchies || root)?.[index];

      if (hierarchy?.type === EnumHierarchyType.ITEM) {
        const widget = await getWidgetConfigs({
          queryKey: [hierarchy.id, isTutorialMode],
        });

        onCreate({ ...hierarchy, payload: widget });
        setHierarchies(undefined);
      } else if (hierarchy?.type === EnumHierarchyType.GROUP) {
        const hierarchies = await searchHierarchies({
          queryKey: [
            { category: 'widgets', superior: hierarchy.id },
            isTutorialMode,
          ],
        });

        setHierarchies(hierarchies);

        return {
          subtitle: hierarchy.title,
          title,
          items: getValidHierarchies(hierarchies).map(({ type, title }) => ({
            label: title,
            icon:
              type === EnumHierarchyType.GROUP
                ? 'faFolder'
                : NAV_ITEMS.widgets.icon,
          })),
        };
      }
    },
  };
}
