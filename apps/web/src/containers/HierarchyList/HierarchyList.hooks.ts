import * as Dnd from '@dnd-kit/core';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getHierarchyData } from '~web/services';
import type { HierarchyData, SearchHierarchyParams } from '~web/services';
import type { HierarchyListProps } from './HierarchyList.types';

export function useDndContextProps(): Dnd.DndContextProps {
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
    onDragEnd: ({ active, over }) => {
      if (active && over) {
        console.log('active:', active.id, ', over:', over.id);
      }
    },
  };
}

export function useDroppable(data: HierarchyData<string>, disabled = false) {
  const { _id: id, type } = data;
  const drop = Dnd.useDroppable({ id, disabled: disabled || type !== 'group' });

  return {
    dropRef: drop.setNodeRef,
    isDropOver: drop.isOver,
  };
}

export function useDraggable(data: HierarchyData<string>, disabled = false) {
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
          : `translate3d(${drag.transform.x}px, ${drag.transform.y}px, 0) scale(0.9)`,
      },
      ...(!disabled && {
        ...drag.attributes,
        ...drag.listeners,
      }),
    },
  };
}

export function useHierarchyData({
  category,
  superior,
  initialData,
}: Pick<HierarchyListProps, 'category' | 'superior' | 'initialData'>) {
  const [isPending, startTransition] = useTransition();
  const [selecteds, setSelecteds] = useState<string[]>([]);

  const [params, setParams] = useState<SearchHierarchyParams>({
    category,
    superior,
  });

  const { data, isLoading } = useSuspenseQuery({
    ...(!params.keyword && { initialData }),
    queryKey: [params],
    queryFn: getHierarchyData,
  });

  useEffect(() => {
    setSelecteds([]);
  }, [data]);

  return {
    isLoading: isPending || isLoading,
    params,
    selecteds,

    onParamsChange: (e: SearchHierarchyParams) =>
      startTransition(() => setParams(e)),

    onDataSelect: (isSelected: boolean, data: HierarchyData<string>) => {
      const set = new Set(selecteds);

      set.delete(data._id);
      isSelected && set.add(data._id);
      setSelecteds(Array.from(set));
    },

    ...useMemo(
      () =>
        data?.reduce<
          Record<HierarchyData<string>['type'], HierarchyData<string>[]>
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
