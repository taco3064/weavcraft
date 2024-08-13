import { arrayMove } from '@dnd-kit/sortable';
import { useRef, type RefObject } from 'react';
import { useTheme } from '@mui/material/styles';

import type {
  DataType,
  DndHandles,
  ResizeRecord,
  ResponsiveGridProps,
} from './ResponsiveGrid.types';

let temp: ResizeRecord = null;

export function useItemProps<T extends DataType>({
  items,
  rowHeight: defaultRowHeight,
  onResize,
  onResort,
  renderItem,
}: Pick<
  ResponsiveGridProps<T>,
  'items' | 'rowHeight' | 'onResize' | 'onResort' | 'renderItem'
>) {
  const theme = useTheme();
  const itemProps = items?.map((item) => renderItem(item).props) || [];

  return {
    itemProps,

    rowHeight:
      defaultRowHeight +
      Number.parseFloat(
        itemProps.some((props) => props?.actions) || onResize || onResort
          ? theme.spacing(6)
          : '0'
      ),
  };
}

export function useDndHandles<T extends DataType>(
  cols: number,
  props: Pick<
    ResponsiveGridProps<T>,
    'items' | 'rowHeight' | 'onResize' | 'onResort'
  >
): [RefObject<HTMLUListElement>, DndHandles] {
  const { items = [], rowHeight, onResize, onResort } = props;
  const gridRef = useRef<HTMLUListElement>(null);

  return [
    gridRef,
    {
      onDragStart: ({ active }) => {
        const { id } = active as { id: string };
        const rect = gridRef.current?.getBoundingClientRect();
        const el = document.getElementById(id.replace(/^resize-/, ''));

        if (id.startsWith('resize-') && rect && el) {
          console.log(el.offsetHeight);

          temp = {
            el,
            columnWidth: rect.width / cols,
            itemHeight: el.offsetHeight,
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
            height: ${temp.itemHeight}px !important;
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
    },
  ];
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
