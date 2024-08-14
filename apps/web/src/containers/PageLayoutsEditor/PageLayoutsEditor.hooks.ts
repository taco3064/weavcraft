import _get from 'lodash/get';
import { nanoid } from 'nanoid';
import { useId, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Breakpoint } from '@mui/material/styles';

import { NAV_ITEMS } from '~web/hooks';
import { NEW_LAYOUT } from './PageLayoutsEditor.const';
import { ViewModeEnum } from './PageLayoutsEditor.types';
import { useTutorialMode } from '~web/contexts';
import type { HierarchyData, PageLayoutConfigs } from '~web/services';
import type { MenuDialogProps } from '~web/components';

import {
  EnumHierarchyType,
  getHierarchyData,
  getWidgetConfigs,
} from '~web/services';

import type {
  ChangeEvents,
  WidgetCreateButtonProps,
} from './PageLayoutsEditor.types';

export function useChangeEvents(
  breakpoint: Breakpoint,
  viewMode: ViewModeEnum | undefined,
  value: PageLayoutConfigs,
  onChange: (value: PageLayoutConfigs) => void
): ChangeEvents {
  return {
    onCreate: (id, widget) =>
      onChange({
        ...value,
        layouts: [
          ...value.layouts,
          {
            id: nanoid(),
            widgetId: id,
            spans: { xs: { cols: 1, rows: 1 } },
          },
        ],
      }),
    onRemove: (id) =>
      onChange({
        ...value,
        layouts: value.layouts.filter((layout) => layout.id !== id),
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
        : (layouts) =>
            onChange({
              ...value,
              layouts: layouts.filter(({ id }) => id !== NEW_LAYOUT.id),
            }),
  };
}

export function useWidgetCreate(
  title: string,
  onCreate: WidgetCreateButtonProps['onCreate']
): {
  hierarchies: HierarchyData[];
  onItemClick: MenuDialogProps['onItemClick'];
} {
  const isTutorialMode = useTutorialMode();
  const queryHash = useId();

  const { data: hierarchies } = useQuery({
    queryHash,
    queryKey: [{ category: 'widgets' }, isTutorialMode],
    queryFn: getHierarchyData,
  });

  const getValidHierarchies = (hierarchies?: HierarchyData[]) =>
    hierarchies
      ?.sort(({ type: t1 }, { type: t2 }) => t1.localeCompare(t2))
      .filter(
        ({ type, payloadId }) => type === EnumHierarchyType.GROUP || payloadId
      ) || [];

  return {
    hierarchies: useMemo(() => getValidHierarchies(hierarchies), [hierarchies]),
    onItemClick: async (_e: string, index: number) => {
      const hierarchy = hierarchies?.[index];

      if (hierarchy?.type === EnumHierarchyType.ITEM) {
        const widget = await getWidgetConfigs({
          queryKey: [hierarchy.id, isTutorialMode],
        });

        onCreate(_get(widget, ['id']) as string, widget);
      } else if (hierarchy?.type === EnumHierarchyType.GROUP) {
        const hierarchies = await getHierarchyData({
          queryKey: [
            { category: 'widgets', superior: hierarchy.id },
            isTutorialMode,
          ],
        });

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
