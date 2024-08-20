import * as Dnd from '@dnd-kit/core';
import { useEffect, useId, useMemo, useState, useTransition } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'next-i18next';

import { EnumHierarchyType, updateHierarchyData } from '~web/services';
import { useTutorialMode } from '~web/contexts';

import type { HierarchyData, SearchHierarchyParams } from '../imports.types';

import type {
  BodyScrollDeviation,
  HierarchyListProps,
  SuperiorMutationHook,
} from './HierarchyList.types';

let bodyScrollDeviation: BodyScrollDeviation = null;

export const useSuperiorMutation: SuperiorMutationHook = ({
  initialData: data,
  superiors,
  onMutationSuccess,
}) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [dragging, setDragging] = useState(false);

  const groupId = useId();
  const isTutorialMode = useTutorialMode();

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

  const { mutate: updateSuperior } = useMutation({
    mutationFn: updateHierarchyData,
    onError: (err) => enqueueSnackbar(err.message, { variant: 'error' }),
    onSuccess: (data) => {
      onMutationSuccess?.('update', data);

      enqueueSnackbar(t('msg-success-update', { name: data.title }), {
        variant: 'success',
      });
    },
  });

  return {
    isDragging: dragging,

    ids: {
      fab: superiors[superiors.length - 2]?.id || 'root',
      group: groupId,
    },
    contextProps: {
      sensors,

      onDragStart: () => {
        const initScrollTop = global.document?.body.scrollTop || 0;
        const groupEl = global.document?.getElementById(groupId);

        groupEl?.scrollIntoView({
          behavior: 'auto',
          block: 'center',
        });

        const scrollTop = global.document?.body.scrollTop || 0;

        global.navigator?.vibrate?.([10, 10, 10]);
        setDragging(true);

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
        const target = data.find(({ id }) => active?.id === id);

        bodyScrollDeviation = null;
        setDragging(false);

        if (target && over && target.id !== over.id) {
          updateSuperior({
            isTutorialMode,
            input: {
              ...target,
              superior: over.id === 'root' ? undefined : (over.id as string),
            },
          });
        }
      },
    },
  };
};

export function useDroppable<P>({ id, type }: HierarchyData<P>) {
  const drop = Dnd.useDroppable({
    id,
    disabled: type !== EnumHierarchyType.GROUP,
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
  superiors,
  renderContent,
}: Pick<HierarchyListProps<P>, 'category' | 'renderContent' | 'superiors'>) {
  const superior = superiors[superiors.length - 1]?.id;
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

export function useDataCollections<P>(data: HierarchyData<P>[]) {
  return useMemo(
    () =>
      data.reduce<Record<Lowercase<EnumHierarchyType>, HierarchyData<P>[]>>(
        (result, item) => {
          const type = item.type.toLowerCase() as Lowercase<EnumHierarchyType>;

          return {
            ...result,
            [type]: [...result[type], item],
          };
        },
        { group: [], item: [] }
      ),
    [data]
  );
}
