import * as Dnd from '@dnd-kit/core';
import { useEffect, useId, useMemo, useState, useTransition } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getHierarchyData } from '~web/services';
import type { HierarchyData, SearchHierarchyParams } from '~web/services';
import type { HierarchyListProps } from './HierarchyList.types';

let bodyScrollTop = 0;

export function useDndContextProps(
  ids: Record<'group' | 'item', string>
): Dnd.DndContextProps {
  const sensors = Dnd.useSensors(
    Dnd.useSensor(Dnd.MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    Dnd.useSensor(Dnd.TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  return {
    sensors,
    onDragStart: () => {
      Object.values(ids).forEach((id) => {
        const el = global.document?.getElementById(id);

        bodyScrollTop = global.document?.body.scrollTop || 0;

        if (el) {
          const { height } = el.getBoundingClientRect();

          el.style.height = `${height}px`;
        }
      });
    },
    onDragEnd: ({ active, over }) => {
      if (active && over) {
        console.log('active:', active.id, ', over:', over.id);
      }

      bodyScrollTop = 0;

      Object.values(ids).forEach((id) => {
        const el = global.document?.getElementById(id);

        if (el) {
          el.style.height = '';
        }
      });
    },
  };
}

export function useDroppable<P>(
  data: HierarchyData<string, P>,
  disabled = false
) {
  const { _id: id, type } = data;
  const drop = Dnd.useDroppable({ id, disabled: disabled || type !== 'group' });

  return {
    dropRef: drop.setNodeRef,
    isDropOver: drop.isOver,
  };
}

export function useDraggable<P>(
  data: HierarchyData<string, P>,
  disabled = false
) {
  const { _id: id } = data;
  const { active } = Dnd.useDndContext();
  const drag = Dnd.useDraggable({ id, disabled });

  return {
    dragRef: drag.setNodeRef,
    isDragging: drag.isDragging,
    dragProps: {
      style: {
        opacity: !active || active.id === id ? 1 : 0.6,
        transform: !drag.transform
          ? undefined
          : `translate(${drag.transform.x}px, ${
              drag.transform.y - bodyScrollTop
            }px) scale(0.9)`,
      },
      ...(!disabled && {
        ...drag.attributes,
        ...drag.listeners,
      }),
    },
  };
}

export function useHierarchyData<P>({
  PreviewComponent,
  category,
  superior,
  initialData,
  isInTutorial = false,
}: Pick<
  HierarchyListProps<P>,
  'PreviewComponent' | 'category' | 'superior' | 'initialData' | 'isInTutorial'
>) {
  const [isPending, startTransition] = useTransition();
  const [selecteds, setSelecteds] = useState<string[]>([]);

  const [params, setParams] = useState<SearchHierarchyParams>({
    category,
    superior,
    withPayload: Boolean(PreviewComponent),
  });

  const {
    data = initialData || [],
    isLoading,
    refetch: onRefetch,
  } = useQuery({
    enabled: Boolean(params.keyword?.trim()),
    queryKey: [params, isInTutorial],
    queryFn: getHierarchyData,
  });

  useEffect(() => {
    setSelecteds([]);
  }, [data]);

  useEffect(() => {
    setParams({ category, superior, withPayload: Boolean(PreviewComponent) });
  }, [PreviewComponent, category, superior]);

  return {
    isLoading: isPending || isLoading,
    params,
    selecteds,

    onRefetch,

    onParamsChange: (e: SearchHierarchyParams) =>
      startTransition(() => setParams(e)),

    onDataSelect: (isSelected: boolean, data: HierarchyData<string, P>) => {
      const set = new Set(selecteds);

      set.delete(data._id);
      isSelected && set.add(data._id);
      setSelecteds(Array.from(set));
    },

    ...useMemo(
      () =>
        data.reduce<
          Record<HierarchyData<string, P>['type'], HierarchyData<string, P>[]>
        >(
          (result, item) => ({
            ...result,
            [item.type]: [...result[item.type], item],
          }),
          { group: [], item: [] }
        ),
      [data]
    ),
  };
}
