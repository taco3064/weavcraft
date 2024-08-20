import { arrayMove } from '@dnd-kit/sortable';
import { useRef } from 'react';
import { useTheme } from '@mui/material/styles';

import type {
  DataType,
  DndHandlesHookReturn,
  ResizeRecord,
  ResponsiveGridProps,
} from './ResponsiveGrid.types';

let temp: ResizeRecord = null;

export function useDndHandles<T extends DataType>(
  cols: number,
  props: Pick<
    ResponsiveGridProps<T>,
    'items' | 'rowHeight' | 'onResize' | 'onResort'
  >
): DndHandlesHookReturn {
  const { items = [], rowHeight, onResize, onResort } = props;

  const theme = useTheme();
  const ref = useRef<HTMLUListElement>(null);
  const toolbarHeight = Number.parseFloat(theme.spacing(6));

  return {
    ref,

    onDragStart: ({ active }) => {
      const { id } = active as { id: string };
      const rect = ref.current?.getBoundingClientRect();
      const el = document.getElementById(id.replace(/^resize-/, ''));

      global.navigator?.vibrate?.([10, 10, 10]);

      if (id.startsWith('resize-') && rect && el) {
        temp = {
          el,
          columnWidth: rect.width / cols,
          itemHeight: el.offsetHeight - toolbarHeight,
          itemWidth: el.offsetWidth,
          x: 0,
          y: 0,
        };
      }
    },
    onDragMove: ({ delta }) => {
      if (temp) {
        const diffx = delta.x - (temp.x || 0);
        const diffy = delta.y - (temp.y || 0);

        temp.x = delta.x;
        temp.y = delta.y;
        temp.itemWidth = temp.itemWidth + diffx;
        temp.itemHeight = temp.itemHeight + diffy;

        const grid = getColsAndRows(cols, rowHeight, temp);

        temp.el.style.cssText = `
            height: ${temp.itemHeight + toolbarHeight}px !important;
            grid-column-end: span ${grid.cols};
            grid-row-end: span ${grid.rows};
          `;
      }
    },
    onDragEnd: ({ active, over }) => {
      if (temp) {
        const item = items.find((item) => item.id === temp?.el.id);

        onResize?.(item as T, getColsAndRows(cols, rowHeight, temp));

        temp.el.style.removeProperty('height');
        temp = null;
      } else if (active.id !== over?.id) {
        const activeIndex = items.findIndex(({ id }) => id === active.id);
        const overIndex = items.findIndex(({ id }) => id === over?.id);

        onResort?.(arrayMove(items, activeIndex, overIndex));
      }
    },
  };
}

function getColsAndRows(
  cols: number,
  rowHeight: number,
  { columnWidth, itemHeight, itemWidth }: NonNullable<ResizeRecord>
) {
  const resultCols = Math.max(
    1,
    Math.min(cols, Math.round(itemWidth / columnWidth))
  );

  return {
    cols: resultCols,
    rows: Math.max(
      1,
      resultCols === cols ? 1 : Math.round(itemHeight / rowHeight)
    ),
  };
}
