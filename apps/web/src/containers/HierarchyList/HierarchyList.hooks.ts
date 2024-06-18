import * as Dnd from '@dnd-kit/core';
import { useEffect, useMemo, useState, useTransition } from 'react';

import { EnumHierarchyType } from '~web/services';
import type { HierarchyData, SearchHierarchyParams } from '../containers.types';
import type { HierarchyListProps } from './HierarchyList.types';

let bodyScrollTop = 0;

export function useDndContextProps(
  ids: Record<Lowercase<EnumHierarchyType>, string>
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

export function useDroppable<P>(data: HierarchyData<P>, disabled = false) {
  const { id, type } = data;
  const drop = Dnd.useDroppable({
    id,
    disabled: disabled || type !== EnumHierarchyType.GROUP,
  });

  return {
    dropRef: drop.setNodeRef,
    isDropOver: drop.isOver,
  };
}

export function useDraggable<P>(data: HierarchyData<P>, disabled = false) {
  const { id } = data;
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

export function useQueryVariables<P>({
  category,
  superior,
  renderPreview,
}: Pick<HierarchyListProps<P>, 'category' | 'renderPreview' | 'superior'>) {
  const [isPending, startTransition] = useTransition();

  const [params, setParams] = useState<SearchHierarchyParams>({
    category,
    superior,
    withPayload: Boolean(renderPreview),
  });

  useEffect(() => {
    setParams({ category, superior, withPayload: Boolean(renderPreview) });
  }, [category, superior, renderPreview]);

  return {
    isFiltering: Boolean(params.keyword?.trim()),
    isLoading: isPending,
    params,

    onParamsChange: (e: SearchHierarchyParams) =>
      startTransition(() => setParams(e)),
  };
}

export function useDataStore<P>(data: HierarchyData<P>[]) {
  const [selecteds, setSelecteds] = useState<string[]>([]);

  useEffect(() => {
    setSelecteds([]);
  }, [data]);

  return {
    selecteds,

    ...useMemo(
      () =>
        data.reduce<Record<Lowercase<EnumHierarchyType>, HierarchyData<P>[]>>(
          (result, item) => {
            const type =
              item.type.toLowerCase() as Lowercase<EnumHierarchyType>;

            return {
              ...result,
              [type]: [...result[type], item],
            };
          },
          { group: [], item: [] }
        ),
      [data]
    ),

    onDataSelect: (isSelected: boolean, data: HierarchyData<P>) => {
      const set = new Set(selecteds);

      set.delete(data.id);
      isSelected && set.add(data.id);
      setSelecteds(Array.from(set));
    },
  };
}
