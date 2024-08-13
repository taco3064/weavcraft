import * as Dnd from '@dnd-kit/core';
import * as Sortable from '@dnd-kit/sortable';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';

import ResponsiveItem from './ResponsiveGrid.Item';
import { useBreakpointMatches } from '../../hooks';
import { useDndHandles, useItemProps } from './ResponsiveGrid.hooks';
import { useMainStyles } from './ResponsiveGrid.styles';

import type {
  DataType,
  ResponsiveMaxWidths,
  ResponsiveGridProps,
} from './ResponsiveGrid.types';

const DEFAULT_COLS = { xs: 2 };

const DEFAULT_MAX__WIDTHS: ResponsiveMaxWidths = {
  xs: 'xs',
};

export default function ResponsiveGrid<T extends DataType>({
  breakpoint,
  cols = DEFAULT_COLS,
  gap = 8,
  items,
  maxWidths = DEFAULT_MAX__WIDTHS,
  rowHeight: defaultRowHeight,
  sx,
  renderItem,
  onResize,
  onResort,
}: ResponsiveGridProps<T>) {
  const { matched: maxWidth } = useBreakpointMatches(maxWidths, breakpoint);
  const { matched: col } = useBreakpointMatches(cols, maxWidth);

  const { classes } = useMainStyles({
    cols: (onResort || onResize) && items?.length ? col : undefined,
  });

  const { itemProps, rowHeight } = useItemProps({
    items,
    rowHeight: defaultRowHeight,
    onResize,
    onResort,
    renderItem,
  });

  const [gridRef, dndHandles] = useDndHandles(col, {
    items,
    rowHeight,
    onResize,
    onResort,
  });

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

  return (
    <Dnd.DndContext {...dndHandles} sensors={sensors}>
      <Sortable.SortableContext
        disabled={!onResort}
        items={items || []}
        strategy={Sortable.rectSortingStrategy}
      >
        <Container
          {...{ maxWidth, sx }}
          disableGutters
          className={classes.container}
        >
          <ImageList
            ref={gridRef}
            className={classes.root}
            cols={col}
            rowHeight={rowHeight}
            gap={gap}
            variant="standard"
          >
            {itemProps.map((props) =>
              !props ? null : (
                <ResponsiveItem
                  key={props.id}
                  {...props}
                  {...{
                    enableResize: onResize instanceof Function,
                    enableResort: onResort instanceof Function,
                    GridProps: {
                      breakpoint: maxWidth,
                      cols: col,
                      rowHeight,
                      gap,
                    },
                  }}
                />
              )
            ) || []}
          </ImageList>
        </Container>
      </Sortable.SortableContext>
    </Dnd.DndContext>
  );
}
