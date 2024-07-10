import * as Dnd from '@dnd-kit/core';
import { useEffect, useId, useMemo, useState, useTransition } from 'react';

import { EnumHierarchyType } from '~web/services';
import type {
  BodyScrollDeviation,
  HierarchyListProps,
} from './HierarchyList.types';
import type { HierarchyData, SearchHierarchyParams } from '../imports.types';

let bodyScrollDeviation: BodyScrollDeviation = null;

export function useDndContextProps(): [string, Dnd.DndContextProps] {
  const groupId = useId();

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

  return [
    groupId,
    {
      sensors,
      onDragStart: () => {
        const initScrollTop = global.document?.body.scrollTop || 0;

        global.document?.getElementById(groupId)?.scrollIntoView({
          behavior: 'auto',
          block: 'start',
        });

        const scrollTop = global.document?.body.scrollTop || 0;

        bodyScrollDeviation = {
          hasLeft: false,
          defaults: initScrollTop - scrollTop,
          start: scrollTop,
          value: 0,
        };
      },
      onDragMove: ({ over }) => {
        if (bodyScrollDeviation) {
          const hasLeft = bodyScrollDeviation.hasLeft || !over;

          bodyScrollDeviation = {
            ...bodyScrollDeviation,
            hasLeft,
            ...(hasLeft &&
              !over && {
                value:
                  bodyScrollDeviation.start -
                  (global.document?.body.scrollTop || 0),
              }),
          };
        }
      },
      onDragEnd: ({ active, over }) => {
        bodyScrollDeviation = null;

        if (active && over) {
          console.log('active:', active.id, ', over:', over.id);
        }
      },
    },
  ];
}

export function useDroppable<P>(
  { id, type }: HierarchyData<P>,
  disabled = false
) {
  const drop = Dnd.useDroppable({
    id,
    disabled: disabled || type !== EnumHierarchyType.GROUP,
  });

  return {
    dropRef: drop.setNodeRef,
    isDropOver: drop.isOver,
  };
}

export function useDraggable<P>({ id }: HierarchyData<P>, disabled = false) {
  const { active } = Dnd.useDndContext();
  const { defaults = 0, value = 0 } = bodyScrollDeviation || {};

  const drag = Dnd.useDraggable({ id, disabled });
  const scrollTop = global.document?.body.scrollTop || 0;

  return {
    dragRef: drag.setNodeRef,
    isDragging: drag.isDragging,
    props: {
      draggable: {
        style: {
          opacity: !active || active.id === id ? 1 : 0.6,
          ...(drag.transform && {
            transform: `translate(${drag.transform.x}px, ${
              drag.transform.y - scrollTop - defaults - value
            }px) scale(${active?.id !== id ? 1 : 0.9})`,
          }),
        },
      },
      toggle: {
        ...(!disabled && {
          ...drag.attributes,
          ...drag.listeners,
        }),
      },
    },
  };
}

export function useQueryVariables<P>({
  category,
  superior,
  renderContent,
}: Pick<HierarchyListProps<P>, 'category' | 'renderContent' | 'superior'>) {
  const [isPending, startTransition] = useTransition();

  const [params, setParams] = useState<SearchHierarchyParams>({
    category,
    superior,
    withPayload: renderContent instanceof Function,
  });

  useEffect(() => {
    setParams({
      category,
      superior,
      withPayload: renderContent instanceof Function,
    });
  }, [category, superior, renderContent]);

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
