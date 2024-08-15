import * as Dnd from '@dnd-kit/core';
import * as Sortable from '@dnd-kit/sortable';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import { useTheme } from '@mui/material/styles';

import ResponsiveItem from './ResponsiveGrid.Item';
import { useBreakpointMatches } from '../../hooks';
import { useDndHandles } from './ResponsiveGrid.hooks';
import { useMainStyles } from './ResponsiveGrid.styles';

import type {
  DataType,
  ResponsiveMaxWidths,
  ResponsiveGridProps,
} from './ResponsiveGrid.types';

const DEFAULT_COLS = { xs: 2 };

const DEFAULT_MAX__WIDTHS: ResponsiveMaxWidths = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
};

export default function ResponsiveGrid<T extends DataType>({
  breakpoint,
  cols = DEFAULT_COLS,
  gap = 8,
  items,
  maxWidths = DEFAULT_MAX__WIDTHS,
  rowHeight,
  sx,
  renderItem,
  onResize,
  onResort,
}: ResponsiveGridProps<T>) {
  const { matched: maxWidth } = useBreakpointMatches(maxWidths, breakpoint);
  const { matched: col } = useBreakpointMatches(cols, maxWidth);

  const itemProps = items?.map((item) => renderItem(item).props) || [];
  const lineCols = (onResort || onResize) && items?.length ? col : undefined;
  const theme = useTheme();

  const { ref, ...dndHandles } = useDndHandles(col, {
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

  const { classes } = useMainStyles({
    gap,
    lines: !lineCols ? undefined : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${lineCols * 100} 100`}
      >
        {Array.from({ length: lineCols - 1 }).map((_, i) => {
          const x = (i + 1) * 100;

          return (
            <path
              d={`M ${x} 0 L ${x} 100`}
              stroke={theme.palette.divider}
              strokeDasharray={2}
              strokeWidth={1}
            />
          );
        })}
      </svg>
    ),
  });

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
            ref={ref}
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
                      isToolbarShown: Boolean(
                        onResize ||
                          onResort ||
                          itemProps.some(
                            ({ actions, disableToolbar }) =>
                              actions && !disableToolbar
                          )
                      ),
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
